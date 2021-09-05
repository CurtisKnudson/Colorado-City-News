import { signIn } from "next-auth/client";

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
