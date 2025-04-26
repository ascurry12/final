import React, { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useUser } from "../UserContext.jsx";
import { supabase } from "../src/client";

const Layout = () => {
  const params = useParams();
  const {user, setUser} = useUser();

  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (data?.session) {
        setUser((prev) => {
          return {
            ...prev,
            id: data.session.user.id,
            email: data.session.user.email,
            session: data.session
          };
        });
      }
    };

    getSession();
  }, [setUser]);

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();

    setUser((prev) => {
      return {
          ...prev,
          id: null,
          email: null
        };
    });

  };
  return (
    <div>
      <ul className="navbar">
        <li>
          <Link className="link-style" to="/">
            Home
          </Link>
        </li>
        <li>
          <Link className="link-style" to={`/feed`}>
            Feed
          </Link>
        </li>
        <li style={{ float: "right" }}>
          {user.id ? (
            <Link
              className="link-style"
              style={{ float: "right" }}
              to="/"
              onClick={signOut}
            >
              Sign Out
            </Link>
          ) : (
            <Link className="link-style" to="/login">
              Login
            </Link>
          )}
        </li>
        <li style={{ float: "right" }}>
          {user.id ? null : (
            <Link className="link-style" to="/signup">
              Sign Up
            </Link>
          )}
        </li>
      </ul>
      <Outlet />
    </div>
  );
};

export default Layout;
