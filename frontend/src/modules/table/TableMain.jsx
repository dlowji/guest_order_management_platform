import MainContentHeader from "../common/MainContentHeader";
import CategoriesHeader from "../common/CategoriesHeader";
import categoriesTableItems from "../../constants/CategoriesTableItems";
import CircleLoading from "../../components/loadings/CircleLoading";
import TableList from "./TableList";
import TableItem from "./TableItem";
import { useQuery } from "@tanstack/react-query";
import useQueryString from "../../utils/queryString";
import tableApi from "../../api/table";
import { useEffect, useState } from "react";
const TableMain = () => {
  const [tables, setTables] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  useEffect(() => {
    setIsFetching(true);
    fetch(`http://localhost:5000/api/tables?statusQ=${query}`)
      .then((res) => res.json())
      .then((response) => {
        if (response.code == "SUCCESS") setTables(response.data);
        else {
          setError(response.message);
        }
      });
    setIsFetching(false);
  }, [query]);
  return (
    <div className="table-left">
      <MainContentHeader
        title="Choose tables"
        quantity={tables?.length ? `${tables.length} tables` : "0 tables"}
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
        {tables &&
          !isFetching &&
          !error &&
          tables.map((item) => (
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
