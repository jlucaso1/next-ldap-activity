import type { NextPage } from "next";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const Home: NextPage = () => {
  const { data, status } = useSession();
  const router = useRouter();
  const isAuthenticated = status === "authenticated" && data;

  const isLoading = status === "loading";

  if (isLoading) {
    return <div></div>;
  }

  const user = data?.user;

  if (!isAuthenticated || !user) {
    signIn();
    return <></>;
  }

  const role = user.role;

  const username = user.givenName;

  return (
    <div className="h-screen w-screen relative">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center gap-y-8">
        <div className="text-5xl">
          <span >{"Welcome, "}</span>
          <span className="text-yellow-300">{username}</span>
        </div>
        <div className="text-center">
          <p className="text-2xl text-green-500">{`You are a ${capitalize(
            user.role
          )}`}</p>
          <p className="text-2xl text-blue-500">in Home Page</p>
        </div>
        <div className="flex gap-x-4">
          <div
            className="tooltip"
            data-tip={
              role !== "seller" ? "You are not a seller" : "Go to Seller Page"
            }
          >
            <button
              className={`btn max-w-max btn-primary`}
              onClick={() => router.push("/seller")}
              disabled={role !== "seller"}
            >
              Go to Seller Page
            </button>
          </div>
          <div
            className="tooltip"
            data-tip={
              role !== "manager"
                ? "You are not a manager"
                : "Go to Manager Page"
            }
          >
            <button
              className={`btn max-w-max btn-primary tooltip`}
              onClick={() => router.push("/manager")}
              disabled={role !== "manager"}
            >
              Go to Manager Page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
