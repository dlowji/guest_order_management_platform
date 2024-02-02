import React from "react";
import Table from "../../components/table/Table";
import Caption from "../../components/table/Caption";
import THead from "../../components/table/THead";
import TBody from "../../components/table/TBody";
import TableHeaderSection from "../common/TableHeaderSection";
import Button from "../../components/buttons/Button";
import calculateDuration from "../../utils/calculateDuration";

const tableHeader = [
  {
    id: 1,
    name: "Order no",
  },
  {
    id: 2,
    name: "Order by",
  },
  {
    id: 3,
    name: "Duration",
  },
];
const KitchenTable = ({ items = [], caption = "New order" }) => {
  return (
    <Table>
      <Caption className="p-5 text-lg font-semibold text-left text-gray-900 bg-white">
        <TableHeaderSection
          header={caption}
          totalItems={items.length}
        ></TableHeaderSection>
      </Caption>
      <THead headers={tableHeader} hasAction />
      <TBody>
        {items.length === 0 && (
          <tr className="bg-white border-b">
            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
              No orders available
            </td>
          </tr>
        )}

        {items.map((item, index) => {
          const duration = calculateDuration(item.createdAt);
          const formatedDuration = `${duration.hours}h ${duration.minutes}m`;

          return (
            <tr key={index} className="bg-white border-b">
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                {item.orderId}
              </td>
              <td className="px-6 py-4">{item.accountName}</td>
              <td className="px-6 py-4">{formatedDuration}</td>
              <td className="px-6 py-4 flex items-center gap-3">
                <Button
                  type="button"
                  variant="primary"
                  className="font-medium text-white"
                  href={`/kitchen/${item.orderId}`}
                >
                  View
                </Button>
              </td>
            </tr>
          );
        })}
      </TBody>
    </Table>
  );
};

export default KitchenTable;
