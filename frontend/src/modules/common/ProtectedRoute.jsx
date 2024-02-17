// import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import authApi from "../../api/auth";
import CircleLoading from "../../components/loadings/CircleLoading";
import { getTokenService } from "../../utils/localStorage";
import { useQuery } from "@tanstack/react-query";
import PropTypes from "prop-types";
import { useAuth } from "../../stores/useAuth";
import { useEffect } from "react";

const ProtectedRoute = ({ allowedRoles }) => {
  const token = getTokenService();
  const setUser = useAuth((state) => state.setUser);
  const {
    isFetching,
    data: user,
    isError,
    error,
    isSuccess,
  } = useQuery({
    queryKey: ["authUser", token],
    queryFn: () => authApi.getMe(),
    enabled: !!token,
    retry: 1,
  });
  useEffect(() => {
    if (isSuccess) {
      setUser(user);
    } else if (isError) {
      console.log("error: ", error);
    }
  }, [isSuccess, setUser, user, isError, error]);
  if (isFetching) {
    return (
      <div className="flex items-center justify-center w-full">
        <CircleLoading color="#ff7200"></CircleLoading>
      </div>
    );
  }
  return allowedRoles.includes(user?.roleName.toUpperCase()) ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace={true} />
  );
};

ProtectedRoute.propTypes = {
  allowedRoles: PropTypes.array.isRequired,
};

export default ProtectedRoute;
