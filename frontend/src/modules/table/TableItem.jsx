import React, { useMemo } from "react";
import { Link } from "react-router-dom";

const TableItem = ({ item: { id, seats, tableStatus, title, updatedAt } }) => {
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
  return (
    <Link
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

export default TableItem;
