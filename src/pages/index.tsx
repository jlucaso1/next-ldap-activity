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

  const title = isAuthenticated
    ? `Welcome ${parseUsernameLDAP(data.user.dn)}`
    : "Please sign in";
  const action = isAuthenticated ? () => signOut() : () => signIn();
  const buttonText = isAuthenticated ? "Sign out" : "Sign in";
  return (
    <div className="h-screen w-screen relative">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center gap-y-5">
        <h1 className="text-5xl">{title}</h1>
        <button className="btn max-w-max" onClick={action}>
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default Home;
