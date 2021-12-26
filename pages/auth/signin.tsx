import { CtxOrReq } from "next-auth/lib/client";
import { getCsrfToken } from "next-auth/react";

export default function SignIn({ csrfToken }: { csrfToken: any }) {
  return (
    <form method="post" action="/api/auth/signin/email">
      <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
      <label>
        Email address
        <input type="email" id="email" name="email" />
      </label>
      <label>
        Name
        <input type="name" id="name" name="name" />
      </label>
      <button type="submit">Sign in with Email</button>
    </form>
  );
}

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context: CtxOrReq | undefined) {
  const csrfToken = await getCsrfToken(context);
  return {
    props: { csrfToken },
  };
}
