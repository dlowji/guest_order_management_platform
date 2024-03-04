import React from "react";
import MainContentHeader from "../modules/common/MainContentHeader";
import StatisticItems from "../modules/common/StatisticItems";
import TrendingTable from "../modules/dashboard/TrendingTable";
import StockOutTable from "../modules/dashboard/StockOutTable";
import { useQuery } from "@tanstack/react-query";
import statisticsApi from "../api/statistics";

const DashboardPage = () => {
  const { data: statisticItems } = useQuery({
    queryKey: ["statisticItemsDashboard"],
    queryFn: () => {
      return statisticsApi.getDashboardStatistics();
    },
  });
  return (
    <div className="mb-10">
      <MainContentHeader
        title="Palmon Restaurant"
        quantity={new Date().toDateString()}
      ></MainContentHeader>

      <div className="mt-3 grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5">
        {statisticItems?.data &&
          statisticItems?.data.map((item, index) => {
            return (
              <StatisticItems
                image={item.image}
                title={item.title}
                value={item.value}
                key={index}
              ></StatisticItems>
            );
          })}
      </div>

      <div className="mt-10 grid xl:grid-cols-2 gap-5">
        <TrendingTable></TrendingTable>
        <StockOutTable></StockOutTable>
      </div>
    </div>
  );
};

export default DashboardPage;
