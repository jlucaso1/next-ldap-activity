import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  const { data } = useSession();
  const router = useRouter();
  const user = data?.user;

  return (
    <>
      {user && (
        <div className="navbar bg-base-300 justify-between">
          <button
            className="btn btn-ghost normal-case text-xl"
            onClick={() => router.push("/")}
            disabled={router.pathname === "/"}
          >
            LDAP System
          </button>
          <button className="btn btn-error" onClick={() => signOut()}>
            Logout
          </button>
        </div>
      )}
      <main>{children}</main>
    </>
  );
}
