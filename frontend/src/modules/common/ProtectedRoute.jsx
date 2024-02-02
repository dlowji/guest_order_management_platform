import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {
  //   const token = getTokenService();
  //   const setUser = useAuth((state) => state.setUser);
  //   const { isFetching, data: user } = useQuery({
  //     queryKey: ["authUser", token],
  //     queryFn: () => authApi.getMe(),
  //     enabled: !!token,
  //     retry: 1,
  //     onSuccess: (data) => {
  //       setUser(data);
  //     },
  //     onError: (error) => {
  //       console.log(error);
  //     },
  //   });
  //   if (isFetching) {
  //     return (
  //       <div className="flex items-center justify-center w-full">
  //         <CircleLoading color="#ff7200"></CircleLoading>
  //       </div>
  //     );
  //   }
  //   return allowedRoles.includes(user?.roleName) ? (
  //     <Outlet />
  //   ) : (
  //     <Navigate to="/login" replace={true} />
  //   );
};

export default ProtectedRoute;
