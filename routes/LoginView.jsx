import React from "react";
import { supabase } from "../src/client";
import { useState } from "react";
import { useUser } from "../UserContext.jsx";

const LoginView = () => {
  const [credentials, setCredentials] = useState({
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
  };

  const loginUser = async (event) => {
    event.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });

    setUser((prev) => {
      return {
        ...prev,
        id: data.user.id,
        email: data.user.email,
        session: data.session,
      };
    });

    window.location = "/";
  };

  return (
    <div>
      <form className="universal-form">
        <div>
          <label htmlFor="email">
            <strong> Email</strong>
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
        <input type="submit" value="Login" onClick={loginUser} />
      </form>
    </div>
  );
};

export default LoginView;
