import React from "react";
import MainContentHeader from "../common/MainContentHeader";
import CategoriesHeader from "../common/CategoriesHeader";
import categoriesTableItems from "../../constants/CategoriesTableItems";
import CircleLoading from "../../components/loadings/CircleLoading";
import TableList from "./TableList";
import TableItem from "./TableItem";

const tableItem = [
  {
    id: 1,
    capacity: 4,
    code: "Table 1",
    tableStatus: "free",
    updatedAt: Date.now(),
  },
  {
    id: 2,
    capacity: 4,
    code: "Table 2",
    tableStatus: "occupied",
    updatedAt: Date.now(),
  },
  {
    id: 3,
    capacity: 3,
    code: "Table 3",
    tableStatus: "check_in",
    updatedAt: Date.now(),
  },
  {
    id: 4,
    capacity: 4,
    code: "Table 4",
    tableStatus: "free",
    updatedAt: Date.now(),
  },
  {
    id: 5,
    capacity: 2,
    code: "Table 5",
    tableStatus: "free",
    updatedAt: Date.now(),
  },
  {
    id: 6,
    capacity: 2,
    code: "Table 6",
    tableStatus: "free",
    updatedAt: Date.now(),
  },
];

const TableMain = (props) => {
  const isFetching = false;
  const error = false;
  return (
    <div className="table-left">
      <MainContentHeader
        title="Choose tables"
        quantity={tableItem?.length ? `${tableItem.length} tables` : "0 tables"}
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
        {tableItem &&
          !isFetching &&
          !error &&
          tableItem.map((item) => (
            <TableItem
              key={item.id}
              item={{
                id: item.id,
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
