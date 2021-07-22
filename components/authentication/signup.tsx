import * as React from "react";
import { useState, useEffect } from "react";

// Hooks
import { useUser } from "hooks/useUser";
import { useRouter } from "next/router";

const Signup = () => {
  const router = useRouter();
  const [t, { mutate }] = useUser();
  const [errorMsg, setErrorMsg] = useState("");
  const [userCreate, setUserCreate] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    // redirect to home if user is authenticated
    if (t) router.push("/");
    //  Create a toast notification that user is already signed in, and to sign out if they wish to use another account or create another account.
  }, [t]);

  const handleChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserCreate({ ...userCreate, [name]: value });
  };
  const onSubmitCreate = async (e: any) => {
    e.preventDefault();

    if (userCreate.password !== e.currentTarget.rPassword.value) {
      setErrorMsg("The passwords do not match");
      return;
    }

    const res = await fetch("/api/authentication/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userCreate),
    });

    if (res.status === 201) {
      const userObj = await res.json();
      // set user to useSWR state
      mutate(userObj);
    } else {
      setErrorMsg(await res.text());
    }
    return;
  };
  return (
    <>
      <h1>Sign Up Example</h1>
      {errorMsg && <p className="text-yellow-400">{errorMsg}</p>}
      <div className="w-10/12">
        <form onSubmit={onSubmitCreate}>
          <input
            type="text"
            placeholder="First name"
            name="firstName"
            value={userCreate.firstName}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Last name"
            name="lastName"
            value={userCreate.lastName}
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={userCreate.email}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Password"
            name="password"
            value={userCreate.password}
            onChange={handleChange}
          />
          <input type="text" placeholder="Confirm Password" name="rPassword" />
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};

export default Signup;
