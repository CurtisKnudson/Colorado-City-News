import { signIn } from "next-auth/react";

export const SignIn = () => {
  return (
    <a
      href={`/api/auth/signin`}
      onClick={(e) => {
        e.preventDefault();
        signIn();
      }}
    >
      Sign in
    </a>
  );
};
