import React from "react";
import LoadingCenter from "../common/LoadingCenter";
import HistoryTable from "./HistoryTable";

const HistoryMain = ({ selectedDate, filter }) => {
  //   const { data, isFetching } = useQuery({
  //     queryKey: ["history", selectedDate, filter],
  //     queryFn: () => {
  //       const dateObj = selectedDate ? new Date(selectedDate) : new Date();
  //       if (!selectedDate) {
  //         dateObj.setHours(0, 0, 0, 0);
  //       }

  //       const timeStamp = dateObj.getTime();
  //       return orderApi.getHistory(timeStamp / 1000, filter);
  //     },
  //   });
  const isFetching = false;
  const data = {
    data: [],
  };

  if (isFetching) {
    return <LoadingCenter></LoadingCenter>;
  }

  return (
    <div className="history pb-10">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg xl:max-w-[1920px] xl:mx-10 mx-auto mt-10">
        <HistoryTable
          caption="Completed Orders"
          items={data?.data || []}
        ></HistoryTable>
      </div>
    </div>
  );
};

export default HistoryMain;
