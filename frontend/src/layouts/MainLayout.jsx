// import React from "react";
import { Outlet } from "react-router-dom";
import DashboardSidebar from "../modules/dashboard/DashboardSidebar";
const MainLayout = () => {
  return (
    <div className="menu-dashboard gap-4">
      <DashboardSidebar></DashboardSidebar>
      <div className="dashboard-content flex flex-col flex-1 mx-5">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
