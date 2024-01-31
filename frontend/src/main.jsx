import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.scss";
import App from "./App.jsx";
import {
  BrowserRouter,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import AuthenticateLayout from "./layouts/AuthenticateLayout.jsx";
import LoginPage from "./pages/LoginPage.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
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
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} >
      <App />
    </RouterProvider>
  </React.StrictMode>
);
