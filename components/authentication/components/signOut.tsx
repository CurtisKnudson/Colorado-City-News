import { signOut } from "next-auth/client";

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
