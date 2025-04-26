import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import App from "./App.jsx";
import Layout from "../routes/Layout.jsx";
import CreateView from "../routes/CreateView.jsx";
import EditView from "../routes/EditView.jsx";
import PostView from "../routes/PostView.jsx";
import NotFound from "../routes/NotFound.jsx";
import FeedView from "../routes/FeedView.jsx";
import LoginView from "../routes/LoginView.jsx";
import SignUpView from "../routes/SignUpView.jsx";
import { UserProvider } from "../UserContext.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <UserProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index={true} element={<App />} />
          <Route
            index={false}
            path="/feed"
            element={<FeedView />}
          />
          <Route
            index={false}
            path="/post/create"
            element={<CreateView />}
          />
          <Route
            index={false}
            path="/post/:postId"
            element={<PostView />}
          />
          <Route
            index={false}
            path="/post/edit/:postId"
            element={<EditView />}
          />
          <Route
            index={false}
            path="/login"
            element={<LoginView />}
          />
          <Route index={false} path="/signup" element={<SignUpView />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </UserProvider>
);
