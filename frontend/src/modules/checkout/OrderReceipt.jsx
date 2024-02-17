import React from "react";
import { formatCurrency } from "../../utils/formatCurrency";
import PropTypes from "prop-types";

const OrderReceipt = ({ orderItems = [], discount = 0, tax = 0 }) => {
  const subTotal = React.useMemo(() => {
    return orderItems.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);
  }, [orderItems]);

  const total = React.useMemo(() => {
    return subTotal - discount + tax;
  }, [subTotal, discount, tax]);

  return (
    <table className="min-w-full divide-y divide-slate-500">
      <thead>
        <tr>
          <th
            scope="col"
            className="py-3.5 pl-4 pr-3 text-left text-sm font-normal text-slate-700 sm:pl-6 md:pl-0"
          >
            Order summary
          </th>
          <th
            scope="col"
            className="hidden py-3.5 px-3 text-right text-sm font-normal text-slate-700 sm:table-cell"
          >
            Quantity
          </th>
          <th
            scope="col"
            className="py-3.5 pl-3 pr-4 text-right text-sm font-normal text-slate-700 sm:pr-6 md:pr-0"
          >
            Amount
          </th>
        </tr>
      </thead>
      <tbody>
        {/* <tr className="border-b border-slate-200">
					<td className="py-4 pl-4 pr-3 text-sm sm:pl-6 md:pl-0">
						<div className="font-medium text-slate-700">Dish 1</div>
						<div className="mt-0.5 text-slate-500 sm:hidden">$0.00</div>
					</td>
					<td className="hidden px-3 py-4 text-sm text-right text-slate-500 sm:table-cell">48</td>
					<td className="py-4 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
						$0.00
					</td>
				</tr>
				<tr className="border-b border-slate-200">
					<td className="py-4 pl-4 pr-3 text-sm sm:pl-6 md:pl-0">
						<div className="font-medium text-slate-700">Tesla Charging Station</div>
						<div className="mt-0.5 text-slate-500 sm:hidden">1 unit at $75.00</div>
					</td>
					<td className="hidden px-3 py-4 text-sm text-right text-slate-500 sm:table-cell">4</td>
					<td className="py-4 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
						$0.00
					</td>
				</tr> */}
        {orderItems.length === 0 && (
          <tr className="border-b border-slate-200">
            <td
              className="py-4 pl-4 pr-3 text-sm sm:pl-6 md:pl-0 text-center"
              colSpan={3}
            >
              <h2>No orderline items available</h2>
            </td>
          </tr>
        )}
        {orderItems.map((item, index) => (
          <tr className="border-b border-slate-200" key={index}>
            <td className="py-4 pl-4 pr-3 text-sm sm:pl-6 md:pl-0">
              <div className="font-medium text-slate-700">{item.title}</div>
              <div className="mt-0.5 text-slate-500 sm:hidden">
                {item.quantity} unit at {formatCurrency(item.price)}
              </div>
            </td>
            <td className="hidden px-3 py-4 text-sm text-right text-slate-500 sm:table-cell">
              {item.quantity}
            </td>
            <td className="py-4 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
              {formatCurrency(item.quantity * item.price)}
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <th
            scope="row"
            colSpan={2}
            className="hidden pt-6 pl-6 pr-3 text-sm font-light text-right text-slate-500 sm:table-cell md:pl-0"
          >
            Subtotal
          </th>
          <th
            scope="row"
            className="pt-6 pl-4 pr-3 text-sm font-light text-left text-slate-500 sm:hidden"
          >
            Subtotal
          </th>
          <td className="pt-6 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
            {formatCurrency(subTotal)}
          </td>
        </tr>
        <tr>
          <th
            scope="row"
            colSpan={2}
            className="hidden pt-6 pl-6 pr-3 text-sm font-light text-right text-slate-500 sm:table-cell md:pl-0"
          >
            Discount
          </th>
          <th
            scope="row"
            className="pt-6 pl-4 pr-3 text-sm font-light text-left text-slate-500 sm:hidden"
          >
            Discount
          </th>
          <td className="pt-6 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
            {formatCurrency(discount)}
          </td>
        </tr>
        <tr>
          <th
            scope="row"
            colSpan={2}
            className="hidden pt-4 pl-6 pr-3 text-sm font-light text-right text-slate-500 sm:table-cell md:pl-0"
          >
            Tax
          </th>
          <th
            scope="row"
            className="pt-4 pl-4 pr-3 text-sm font-light text-left text-slate-500 sm:hidden"
          >
            Tax
          </th>
          <td className="pt-4 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
            {formatCurrency(tax)}
          </td>
        </tr>
        <tr>
          <th
            scope="row"
            colSpan={2}
            className="hidden pt-4 pl-6 pr-3 text-sm font-normal text-right text-slate-700 sm:table-cell md:pl-0"
          >
            Total
          </th>
          <th
            scope="row"
            className="pt-4 pl-4 pr-3 text-sm font-normal text-left text-slate-700 sm:hidden"
          >
            Total
          </th>
          <td className="pt-4 pl-3 pr-4 text-sm font-normal text-right text-slate-700 sm:pr-6 md:pr-0">
            {formatCurrency(total)}
          </td>
        </tr>
      </tfoot>
    </table>
  );
};

OrderReceipt.propTypes = {
  orderItems: PropTypes.array,
  orderId: PropTypes.string,
  discount: PropTypes.number,
  tax: PropTypes.number,
};

export default OrderReceipt;
