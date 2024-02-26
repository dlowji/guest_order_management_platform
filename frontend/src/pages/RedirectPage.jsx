import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../stores/useAuth";

const RedirectPage = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  React.useEffect(() => {
    if (auth.user?.roleName === "Admin") {
      navigate("/home");
    }
    if (auth.user?.roleName === "Employee") {
      navigate("/table");
    }
    if (auth.user?.roleName === "Chef") {
      navigate("/menu");
    }
  }, [auth.user?.roleName, navigate]);
  return <></>;
};

export default RedirectPage;
