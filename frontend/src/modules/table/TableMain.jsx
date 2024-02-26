import MainContentHeader from "../common/MainContentHeader";
import CategoriesHeader from "../common/CategoriesHeader";
import categoriesTableItems from "../../constants/CategoriesTableItems";
import CircleLoading from "../../components/loadings/CircleLoading";
import TableList from "./TableList";
import TableItem from "./TableItem";
import { useQuery } from "@tanstack/react-query";
import useQueryString from "../../utils/queryString";
import tableApi from "../../api/table";
import { useEffect } from "react";
import { toast } from "react-toastify";
const TableMain = () => {
  const queryString = useQueryString();
  const statusQ = queryString.q || "";
  const { isError, error, data, isFetching } = useQuery({
    queryKey: ["tables", statusQ],
    queryFn: () => {
      return tableApi.getTables(statusQ);
    },
  });
  useEffect(() => {
    if (isError) {
      toast.error(error.message);
    }
  }, [error, isError]);
  return (
    <div className="table-left">
      <MainContentHeader
        title="Choose tables"
        quantity={data?.length ? `${data.length} tables` : "0 tables"}
      ></MainContentHeader>
      <CategoriesHeader
        categories={categoriesTableItems}
        className="!mt-[10px] "
      ></CategoriesHeader>
      <TableList>
        {isFetching && (
          <div className="flex items-center justify-center w-full">
            <CircleLoading color="#ff7200"></CircleLoading>
          </div>
        )}
        {data &&
          !isFetching &&
          !error &&
          data.map((item) => (
            <TableItem
              key={item._id}
              item={{
                id: item._id,
                seats: item.capacity,
                title: item.code,
                tableStatus: item.tableStatus.toUpperCase(),
                updatedAt: item.updatedAt,
              }}
            ></TableItem>
          ))}
      </TableList>
    </div>
  );
};

export default TableMain;
