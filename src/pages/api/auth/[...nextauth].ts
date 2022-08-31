import NextAuth, { Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { Client } from "ldapts";
export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "LDAP",
      credentials: {
        username: { label: "DN", type: "text", placeholder: "" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const client = new Client({
          url: process.env.LDAP_URL || "",
        });

        return new Promise((resolve, reject) => {
          client
            .bind(credentials?.username || "", credentials?.password || "")
            .then(() => {
              console.log("Logged successful");
              resolve({
                username: credentials?.username || "",
                password: credentials?.password || "",
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
        token.username = user?.username;
        token.password = user?.password;
      }
      return token;
    },
    async session({ session, token }) {
      return { ...session, user: { dn: token.username } } as Session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "",
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET || "",
  },
});
