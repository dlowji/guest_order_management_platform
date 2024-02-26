import TrendingItem from "./TrendingItem";
import TableStatistic from "./TableStatistic";
import LoadingCenter from "../common/LoadingCenter";
import { useQuery } from "@tanstack/react-query";
import orderApi from "../../api/order";

const TrendingTable = () => {
  const { data, isFetching } = useQuery({
    queryKey: ["trendingDishes"],
    queryFn: () => {
      return orderApi.getBestSeller(4);
    },
  });
  return (
    <TableStatistic title="Trending dishes" variant="trending">
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
