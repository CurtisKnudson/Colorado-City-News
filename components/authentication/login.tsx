import * as React from "react";
import { useState } from "react";
import { useAuthenticate } from "hooks/useAuthenticate";

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
    useAuthenticate(user);
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
