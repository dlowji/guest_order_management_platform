import TableStatistic from "./TableStatistic";
import LoadingCenter from "../common/LoadingCenter";
import StockOutItem from "./StockOutItem";
import { useQuery } from "@tanstack/react-query";
import kitchenApi from "../../api/kitchen";

const StockOutTable = () => {
  const { data, isFetching } = useQuery({
    queryKey: ["stockOutItems"],
    queryFn: () => {
      return kitchenApi.getDishesByStatus("un_available");
    },
  });

  return (
    <TableStatistic title="Out of Stock" variant="stockout">
      {isFetching && <LoadingCenter></LoadingCenter>}
      {data?.length === 0 && (
        <div className="text-center text-gray-500 py-8">No trending dishes</div>
      )}
      {data &&
        data.map((item, index) => {
          return (
            <StockOutItem
              key={index}
              image={item.image}
              title={item.title}
              price={item.price}
            ></StockOutItem>
          );
        })}
    </TableStatistic>
  );
};

export default StockOutTable;
