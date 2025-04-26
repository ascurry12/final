import React from "react";
import { supabase } from "../src/client";
import { useState } from "react";
import { useUser } from "../UserContext.jsx";

const SignUpView = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { user, setUser } = useUser();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });

    console.log(name, value);
  };

  const createUser = async (event) => {
    event.preventDefault();

    const { data, error } = await supabase.auth.signUp({
      email: credentials.email,
      password: credentials.password,
      options: {
        user_metadata: {
          username: credentials.username,
        },
      },
    });

    window.location = "/";
  };

  return (
    <div>
      <form className="universal-form">
        <div>
          <label htmlFor="email">
            <strong>Email</strong>
          </label>
          <input
            type="text"
            id="email"
            name="email"
            autoComplete="off"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="username">
            <strong>Username</strong>
          </label>
          <input
            type="text"
            id="username"
            name="username"
            autoComplete="off"
            onChange={handleChange}
          />

          <label htmlFor="password">
            <strong>Password</strong>
          </label>
          <input
            type="password"
            id="password"
            name="password"
            autoComplete="off"
            onChange={handleChange}
          />
        </div>
        <input type="submit" value="Sign Up" onClick={createUser} />
      </form>
    </div>
  );
};

export default SignUpView;
