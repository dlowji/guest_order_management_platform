import { useMemo } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuth } from "../../stores/useAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import orderApi from "../../api/order";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const TableItem = ({
  item: {
    _id: tableId,
    seats = 2,
    tableStatus = "FREE",
    title = "Table 1",
    updatedAt = Date.now(),
  },
}) => {
  if (seats % 2 !== 0) seats += 1;
  const statusColor = useMemo(() => {
    switch (tableStatus) {
      case "FREE":
        return "table-item-free";
      case "OCCUPIED":
        return "table-item-dineIn";
      case "CHECK_IN":
        return "table-item-ordered";
    }
  }, [tableStatus]);
  const currentUser = useAuth((state) => state.user);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: createOrder } = useMutation({
    mutationFn: (userId) => orderApi.createOrder(userId, tableId),
    onSuccess: (response) => {
      if (response.code === "SUCCESS") {
        navigate(`menu/order/${response.data._id}`);
      } else {
        toast.error(response.message);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { mutate: chooseTableOccupied } = useMutation({
    mutationFn: () => orderApi.getProcessingOrderByTableId(tableId),
    onSuccess: (response) => {
      if (response.code === "SUCCESS") {
        navigate(`/menu/order/${response.data._id}`);
      } else {
        toast.error(response.message);
      }
    },
    onError: () => {
      toast.error("This table is occupied, please choose another table");
    },
  });

  const handleChooseTable = async () => {
    const userId = currentUser?._id;
    if (!userId) {
      toast.error("You are not logged in");
      return null;
    }
    if (tableStatus === "FREE") {
      queryClient.invalidateQueries(["table", ""]);
      Swal.fire({
        title: "Choose table",
        text: `Do you want to choose this ${title}?`,
        icon: "question",
        cancelButtonText: "No",
        confirmButtonText: "Yes",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        showCancelButton: true,
      }).then(async (result) => {
        if (result.isConfirmed) {
          createOrder(userId);
        }
      });
    }

    if (tableStatus === "CHECK_IN") {
      toast.error("This table is ordered, please choose another table");
    }

    if (tableStatus === "OCCUPIED") {
      chooseTableOccupied();
    }
  };

  return (
    <Link
      onClick={handleChooseTable}
      className={`cursor-pointer hover:opacity-90 hover:scale-95 transition-all duration-300 ease-out table-item table-item-${seats} ${statusColor} `}
      to={""}
      style={{
        maxWidth: 150 + (50 * seats) / 2 + "px",
      }}
    >
      {Array.from({ length: seats / 2 }).map((_, index) => (
        <div
          className="table-seat"
          key={index * Math.random()}
          style={{
            maxWidth: 100 + (50 * seats) / 2 + "px",
          }}
        ></div>
      ))}
      <div className="table-content">
        <div className="table-content__title">{title}</div>
        <div className="table-content__status">{tableStatus}</div>
        {tableStatus === "CHECK_IN" ||
          (tableStatus === "OCCUPIED" && (
            <div className="table-content__timeIn flex items-baseline gap-2">
              <i className="fa fa-clock"></i>
              <span>{new Date(updatedAt).toLocaleTimeString()}</span>
            </div>
          ))}
      </div>
      {Array.from({ length: seats / 2 }).map((_, index) => (
        <div
          className="table-seat"
          key={index * Math.random()}
          style={{
            maxWidth: 100 + (50 * seats) / 2 + "px",
          }}
        ></div>
      ))}
    </Link>
  );
};

TableItem.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string,
    seats: PropTypes.number,
    tableStatus: PropTypes.string,
    title: PropTypes.string,
    updatedAt: PropTypes.string,
  }),
};

export default TableItem;
