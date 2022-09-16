import NextAuth, { Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { Client } from "ldapts";
import { Person } from "../../../types/common";
export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "LDAP",
      credentials: {
        username: { label: "Username/CN", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const client = new Client({
          url: process.env.LDAP_URL || "",
        });

        return new Promise((resolve, reject) => {
          client
            .bind(
              process.env.LDAP_USER_DN || "",
              process.env.LDAP_USER_PASSWORD || ""
            )
            .then(async () => {
              const result = await client.search("ou=Groups,dc=example,dc=org");
              const findUserGroup = result.searchEntries.find((entry) => {
                const uniqueMembers = entry.uniqueMember;
                if (typeof uniqueMembers === "string") {
                  return uniqueMembers.includes(`cn=${credentials?.username}`);
                }
                // check if uniqueMembers is an aray of string
                else if (Array.isArray(uniqueMembers)) {
                  return (uniqueMembers as string[]).find((member: string) =>
                    member.includes(`cn=${credentials?.username}`)
                  );
                }
              });

              if (!findUserGroup) reject(new Error("User not found"));

              //find user details
              const userResult = await client
                .search(
                  `cn=${credentials?.username},ou=People,dc=example,dc=org`
                )
                .catch(() => {
                  throw new Error("User not found");
                });
              const user = userResult.searchEntries[0];

              if (!user) return reject(new Error("User not found"));

              // check password

              if (!(user?.userPassword === credentials?.password))
                return reject(new Error("Invalid password"));

              const person = {
                cn: user?.cn,
                dn: user?.dn,
                givenName: user?.givenName,
                mail: user?.mail,
                uid: user?.uid,
                role:
                  findUserGroup?.cn === "Sellers"
                    ? "seller"
                    : findUserGroup?.cn === "Managers"
                    ? "manager"
                    : "user",
                password: user?.userPassword,
              } as Person;

              resolve({
                ...person,
              });
            })
            .catch((err) => {
              console.log("err", err);
              reject("Invalid credentials");
            });
        });
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      const isSignIn = user ? true : false;
      if (isSignIn) {
        token.cn = user?.cn;
        token.dn = user?.dn;
        token.password = user?.password;
        token.givenName = user?.givenName;
        token.mail = user?.mail;
        token.uid = user?.uid as string;
        token.role = user?.role;
        token.cn = user?.cn;
        token.dn = user?.dn;
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          mail: token.mail,
          role: token.role,
          cn: token.cn,
          dn: token.dn,
          givenName: token.givenName,
          uid: token.uid,
        },
      } as Session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "",
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET || "",
  },
});
