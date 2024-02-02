import React from "react";
import TrendingItem from "./TrendingItem";
import TableStatistic from "./TableStatistic";
import LoadingCenter from "../common/LoadingCenter";

const TrendingTable = () => {
  const isFetching = false;
  const data = [];
  return (
    <TableStatistic title="Trending dishes" varient="trending">
      {isFetching && <LoadingCenter></LoadingCenter>}
      {data?.items?.length === 0 && (
        <div className="text-center text-gray-500 py-8">No trending dishes</div>
      )}
      {data?.items &&
        data?.items.map((item, index) => {
          return (
            <TrendingItem
              key={index}
              image={item.image}
              title={item.title}
              value={item.totalOrdered}
              price={item.price}
            ></TrendingItem>
          );
        })}
    </TableStatistic>
  );
};

export default TrendingTable;
