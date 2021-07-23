import * as React from "react";
import { useState, useEffect } from "react";
import Router from "next/router";

import { Magic } from "magic-sdk";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
  });

  const handleChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
  };
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const magic = new Magic(process.env.MAGIC_PUBLISHABLE_KEY, {
        testMode: true,
      });
      const didToken = await magic.auth.loginWithMagicLink({
        email: user.email,
      });
      const res = await fetch("/api/authentication/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + didToken,
        },
        body: JSON.stringify(user),
      });
      if (res.status === 200) {
        Router.push("/");
      }
    } catch (error) {
      console.error("An unexpected error has occurred", error);
    }
  };
  return (
    <>
      <h1>Login</h1>
      <div className="w-10/12">
        <form onSubmit={onSubmit}>
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};

export default Login;
