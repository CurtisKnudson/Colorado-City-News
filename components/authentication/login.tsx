import * as React from "react";
import { useState, useEffect } from "react";
import Router from "next/router";

// Hooks
import { useUser } from "hooks/useUser";

const Login = () => {
  const [t, { mutate }] = useUser();
  const [errorMsg, setErrorMsg] = useState("");
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    // redirect to home if user is authenticated
    if (t) Router.push("/");
    // TODO: Create a toast notification that user is already signed in, and to sign out if they wish to use another account or create another account.
  }, [t]);

  const handleChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
  };
  const onSubmit = async (e: any) => {
    e.preventDefault();
    const res = await fetch("/api/authentication/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: user.email,
        password: user.password,
      }),
    });

    if (res.status === 200) {
      const userObj = await res.json();
      // set user to useSWR state
      mutate(userObj);
    } else {
      setErrorMsg("Incorrect username or password. Try better!");
    }
  };
  return (
    <>
      <h1>Login</h1>
      {errorMsg && <p className="text-red-500">{errorMsg}</p>}
      <div className="w-10/12">
        <form onSubmit={onSubmit}>
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
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};

export default Login;
