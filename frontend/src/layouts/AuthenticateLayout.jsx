// import React from "react";
import { Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import { getTokenService } from "../utils/localStorage";
import { useAuth } from "../stores/useAuth";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import authApi from "../api/auth";
import { useEffect } from "react";
import LoadingCenter from "../modules/common/LoadingCenter";

const AuthenticateLayout = ({ heading, subheading }) => {
  const token = getTokenService();
  const setUser = useAuth((state) => state.user);
  const navigate = useNavigate();
  const { error, isError, isSuccess, isFetching, data } = useQuery({
    queryKey: ["authUser", token],
    queryFn: () => {
      authApi.getMe();
    },
    enabled: !!token,
    retry: 1,
  });

  useEffect(() => {
    if (isError) {
      console.log("error", error);
    }

    if (isSuccess) {
      setUser(data);
      navigate("/");
    }
  }, [data, error, isError, isSuccess, navigate, setUser]);

  if (isFetching) {
    return <LoadingCenter className="mt-10"></LoadingCenter>;
  }
  return (
    <section className="h-screen mb-10">
      <div className="container px-6 py-12 h-full">
        <div className="flex justify-center items-center flex-wrap h-full text-gray-800">
          <div className="md:w-8/12 lg:w-5/12 mb-12 md:mb-0 ">
            <img
              src="/images/bg.png"
              className="aspect-square h-full"
              alt="Background"
            />
          </div>
          <div className="md:w-8/12 lg:w-6/12 lg:ml-20">
            <h1 className="text-4xl font-bold mb-4 text-center">{heading}</h1>
            <p className="text-gray-500 text-center mb-8">{subheading}</p>
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </section>
  );
};

AuthenticateLayout.propTypes = {
  heading: PropTypes.string,
  subheading: PropTypes.string,
};

export default AuthenticateLayout;
