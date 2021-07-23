import * as React from "react";
import { useState } from "react";
import { useAuthenticate } from "hooks/useAuthenticate";

const Signup = () => {
  const [userCreate, setUserCreate] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const handleChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserCreate({ ...userCreate, [name]: value });
  };
  const onSubmitCreate = async (e: any) => {
    e.preventDefault();
    useAuthenticate(userCreate);
    return;
  };
  return (
    <>
      <h1>Sign Up Example</h1>
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
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};

export default Signup;
