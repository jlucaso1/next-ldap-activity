import type { NextPage } from "next";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";

const SellerPage: NextPage = () => {
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

  // check role
  if (user.role !== "seller") {
    router.push("/");
    return <></>;
  }

  const username = user?.givenName;

  return (
    <div className="h-screen w-screen relative">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center gap-y-5">
        <div className="text-5xl">
          <span>{"Hi, "}</span>
          <span className="text-yellow-300">{username}</span>
        </div>
        <p className="text-2xl text-green-500">You are in Seller Page</p>
        <button className={`btn max-w-max btn-primary`}>
          Add a fake product
        </button>
      </div>
    </div>
  );
};

export default SellerPage;
