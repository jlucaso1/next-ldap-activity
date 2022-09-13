import type { NextPage } from "next";
import { useSession, signIn, signOut } from "next-auth/react";
import React from "react";
import { parseDN } from "../utils/ldap-utils";

const Home: NextPage = () => {
  const { data, status } = useSession();

  const isAuthenticated = status === "authenticated" && data;

  const isLoading = status === "loading";

  const parsedDN = parseDN(data?.user.dn);

  const username = parsedDN?.[parsedDN?.length - 1]?.split("=")[1];
  const title = isAuthenticated ? `Welcome ${username}` : "Please sign in";
  const action = isAuthenticated ? () => signOut() : () => signIn();
  const buttonText = isAuthenticated ? "Sign out" : "Sign in";
  const buttonType = isAuthenticated ? "btn-error" : "btn-primary";

  if (isLoading) {
    return <div></div>;
  }
  return (
    <div className="h-screen w-screen relative">
      {isAuthenticated && (
        <div className="absolute top-0 left-1 breadcrumbs text-base font-medium">
          <ul>
            {parsedDN?.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      )}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center gap-y-5">
        <h1 className="text-5xl">{title}</h1>
        <button className={`btn max-w-max ${buttonType}`} onClick={action}>
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default Home;
