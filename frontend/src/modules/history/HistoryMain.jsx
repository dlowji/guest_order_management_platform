import LoadingCenter from "../common/LoadingCenter";
import HistoryTable from "./HistoryTable";
import PropTypes from "prop-types";
import { useQuery } from "@tanstack/react-query";
import historyApi from "../../api/history";

const HistoryMain = ({ selectedDate, filter }) => {
  const { data, isFetching } = useQuery({
    queryKey: ["history", selectedDate, filter],
    queryFn: () => {
      const dateObj = selectedDate ? new Date(selectedDate) : new Date();
      if (!selectedDate) {
        dateObj.setHours(0, 0, 0, 0);
      }

      const timeStamp = dateObj.getTime();
      return historyApi.getHistory(timeStamp / 1000, filter);
    },
  });

  if (isFetching) {
    return <LoadingCenter></LoadingCenter>;
  }
  console.log(data);
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

HistoryMain.propTypes = {
  selectedDate: PropTypes.string,
  filter: PropTypes.string,
};

export default HistoryMain;
