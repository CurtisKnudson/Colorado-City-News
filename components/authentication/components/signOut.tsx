import { signOut } from "next-auth/react";

export const SignOut = () => {
  return (
    <a
      href={`/api/auth/signin`}
      onClick={(e) => {
        e.preventDefault();
        signOut();
      }}
    >
      Sign in
    </a>
  );
};
