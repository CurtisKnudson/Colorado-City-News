import * as React from "react";
import { useState } from "react";
import { Layout } from "@components/layout";

const LoginOrSignup = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const handleChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
  };
  const onSubmit = async (e: any) => {
    e.preventDefault();

    if (user.password !== e.currentTarget.rPassword.value) {
      setErrorMsg("The passwords do not match");
      return;
    }

    const res = await fetch("/api/user/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    if (res.status === 201) {
      setErrorMsg("success");
    } else {
      setErrorMsg(await res.text());
    }
  };
  return (
    <>
      <Layout>
        <h1>Sign Up Example</h1>
        {errorMsg && <p className="text-yellow-400">{errorMsg}</p>}
        <div className="w-10/12">
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="First name"
              name="firstName"
              value={user.firstName}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Last name"
              name="lastName"
              value={user.lastName}
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={user.email}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Password"
              name="password"
              value={user.password}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Confirm Password"
              name="rPassword"
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      </Layout>
    </>
  );
};

export default LoginOrSignup;
