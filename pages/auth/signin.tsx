import React, { useState } from "react";
import { Layout } from "@components/layout";
import { CtxOrReq } from "next-auth/lib/client";
import { getCsrfToken, useSession } from "next-auth/react";
import { toast } from "react-toastify";

const SignIn = ({ csrfToken }: any) => {
  const { data: session, status } = useSession();
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (email) {
      fetch("/api/auth/signin/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, csrfToken }),
      });
      toast(`An e-mail has been sent to ${email}`);
      setEmail("");
      return;
    }
    toast.error("Please enter an email address");
  };
  if (status === "authenticated") {
    return (
      <Layout>
        <div className="mt-28 center-all">You are already signed in</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="center-all mt-16 flex-col">
        <img
          className="h-auto w-36 fontf"
          src="/logo-c-letter.jpg"
          alt="Logo with just letter C"
        />
        <div className="w-full mt-8 p-4">
          <form
            method="post"
            action="/api/auth/signin/email"
            className="center-all flex-col w-full"
          >
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />

            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              className="w-full border border-transparent py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-md rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            />

            <button
              onClick={handleSubmit}
              type="submit"
              className="mt-8 flex-shrink-40 bg-purple-600 text-white text-base py-2 px-4 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps = async (context: CtxOrReq | undefined) => {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
};

export default SignIn;
