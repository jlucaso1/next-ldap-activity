import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Roles } from "../types/common";

// type ProtectedRouteProps = {
//   children: React.ReactNode;
//   allowedRoles: Roles[];
// };

const ProtectedRoute = (Page: NextPage) => {
  const { data, status } = useSession();
  const router = useRouter();

  const isAuthenticated = status === "authenticated" && data;

  const isLoading = status === "loading";
  const user = data?.user;

  if (isLoading) {
    return <></>;
  }

  if (!isAuthenticated || !user) {
    router.replace("/login");
    return <></>;
  }

  // if (!allowedRoles.includes(user.role)) {
  //   router.replace("/login");
  //   return <></>;
  // }

  return <Page />;
};

export default ProtectedRoute;
