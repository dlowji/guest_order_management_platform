import React from "react";
import LoadingCenter from "../common/LoadingCenter";
import KitchenTable from "./KitchenTable";
import { categoriesKitchenOrder } from "../../constants/CategoriesKitchenOrder";

const KitchenMain = () => {
  const isFetching = false;
  const orderItems = {
    data: [],
  };
  //   const { q: status } = useQueryString();
  //   const { data: orderItems, isFetching } = useQuery({
  //     queryKey: ["order", status],
  //     queryFn: () => {
  //       return orderApi.getAll(status);
  //     },
  //   });
  const status = "";

  //   const category = React.useMemo(() => {
  //     return categoriesKitchenOrder.find((item) => item.id === status);
  //   }, [status]);
  const category = categoriesKitchenOrder;

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
