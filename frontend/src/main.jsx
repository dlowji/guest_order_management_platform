import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.scss";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import AuthenticateLayout from "./layouts/AuthenticateLayout.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<ErrorPage/>}>
      <Route
        element={
          <AuthenticateLayout
            heading="Welcome Back!"
            subheading="Sign in to your account to continue"
          ></AuthenticateLayout>
        }
      >
        <Route path="/login" element={<LoginPage></LoginPage>}></Route>
      </Route>
    </Route>
  )
);

document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("root");
  if (!container) throw new Error("No root element found!");
  const root = ReactDOM.createRoot(container);
  root.render(
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
});
