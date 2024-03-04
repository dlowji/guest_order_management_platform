import TrendingItem from "./TrendingItem";
import TableStatistic from "./TableStatistic";
import LoadingCenter from "../common/LoadingCenter";
import { useQuery } from "@tanstack/react-query";
import statisticsApi from "../../api/statistics";

const TrendingTable = () => {
  const { data, isFetching } = useQuery({
    queryKey: ["trendingDishes"],
    queryFn: () => {
      return statisticsApi.getBestSeller(4);
    },
  });
  return (
    <TableStatistic title="Trending dishes" variant="trending">
      {isFetching && <LoadingCenter></LoadingCenter>}
      {data?.data?.length === 0 && (
        <div className="text-center text-gray-500 py-8">No trending dishes</div>
      )}
      {data?.data &&
        data?.data.map((item, index) => {
          return (
            <TrendingItem
              key={index}
              title={item.dish.title}
              image={item.dish.image}
              totalOrderedQuantity={item.totalOrderedQuantity}
              price={item.dish.price}
            ></TrendingItem>
          );
        })}
    </TableStatistic>
  );
};

export default TrendingTable;
