import LoadingCenter from "../common/LoadingCenter";
import KitchenTable from "./KitchenTable";
import { categoriesKitchenOrder } from "../../constants/CategoriesKitchenOrder";
import useQueryString from "../../utils/queryString";
import { useQuery } from "@tanstack/react-query";
import orderApi from "../../api/order";
import { useMemo } from "react";

const KitchenMain = () => {
  const { q: status } = useQueryString();
  const { data: orderItems, isFetching } = useQuery({
    queryKey: ["order", status],
    queryFn: () => {
      return orderApi.getAll(status);
    },
  });

  const category = useMemo(() => {
    return categoriesKitchenOrder.find((item) => item.id === status);
  }, [status]);

  if (isFetching) {
    return <LoadingCenter></LoadingCenter>;
  }

  return (
    <div className="kitchen pb-10">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg xl:max-w-[1920px] xl:mx-10 mx-auto mt-10">
        <KitchenTable
          items={orderItems?.data || []}
          caption={category?.name || ""}
        ></KitchenTable>
      </div>
    </div>
  );
};

export default KitchenMain;
