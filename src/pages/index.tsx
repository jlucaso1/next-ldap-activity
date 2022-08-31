import type { NextPage } from "next";
import { useSession, signIn, signOut } from "next-auth/react";
import { parseUsernameLDAP } from "../utils/ldap-utils";

const Home: NextPage = () => {
  const { data, status } = useSession();

  const isAuthenticated = status === "authenticated" && data;

  const isLoading = status === "loading";

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {isAuthenticated ? (
        <div>
          <h1>Welcome {parseUsernameLDAP(data.user.dn)}</h1>
          <button onClick={() => signOut()}>Logout</button>
        </div>
      ) : (
        <div>
          <h1>Please sign in</h1>
          <button onClick={() => signIn()}>Sign in</button>
        </div>
      )}
    </>
  );
};

export default Home;
