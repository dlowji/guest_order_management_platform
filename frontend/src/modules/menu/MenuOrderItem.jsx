import React from "react";
import { useParams } from "react-router-dom";
import { formatCurrency } from "../../utils/formatCurrency";
// import { OrderLineItemStatusResponse } from '@constants/orderLineItemStatus';
import Swal from "sweetalert2";
const MenuOrderItem = ({
  orderLineItemId,
  dishId,
  title,
  price = 0,
  quantity = 1,
  note = "nothing",
  image,
  orderLineItemStatus,
}) => {
  const { id: orderId } = useParams();

  if (!orderId)
    return (
      <div className="text-center">
        <p className="text-2xl text-primaryff">Order id is not found</p>
      </div>
    );

  const increment = (dishId, orderLineItemId) => {};
  const decrement = (dishId, orderLineItemId) => {};
  const updateNoteItem = (dishId, note, orderLineItemId) => {};

  const handleIncrement = async () => {
    increment(dishId, orderLineItemId);
  };

  const handleDecrement = async () => {
    if (orderLineItemStatus !== "UN_COOK") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You cannot decrease quantity of this item!",
      });
      return;
    }
    decrement(dishId, orderLineItemId);
  };

  const handleUpdateNote = async () => {
    const { value: noteUpdate } = await Swal.fire({
      title: "Update Note",
      input: "text",
      inputValue: note,
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "You need to write something!";
        }
        return "";
      },
    });

    if (noteUpdate && noteUpdate !== "nothing") {
      updateNoteItem(dishId, noteUpdate, orderLineItemId);
    }
  };

  return (
    <div className="menu-order-item">
      <div className="menu-order-item-image">
        <img srcSet={`${image} 4x`} alt="food" />
      </div>
      <div className="menu-order-item-content">
        <div className="menu-order-item-title">
          <h4>{title}</h4>
        </div>
        <div className="menu-order-item-note">
          <p>Note: {note}</p>
        </div>
        <div className="menu-order-item-price">
          <h4>{formatCurrency(price)}</h4>
        </div>
        <div className="menu-order-item-btn">
          <div className="menu-order-item-add">
            <button
              className="menu-order-item-btn-minus"
              onClick={handleDecrement}
            >
              <i className="fas fa-minus"></i>
            </button>
            <span className="menu-order-item-quantity">{quantity}</span>
            <button
              className="menu-order-item-btn-plus"
              onClick={handleIncrement}
            >
              <i className="fas fa-plus"></i>
            </button>
          </div>
          <div className="menu-order-item-edit">
            <button
              className="menu-order-item-btn-edit"
              onClick={handleUpdateNote}
            >
              <i className="fas fa-edit"></i>
            </button>
            {/* <button className="menu-order-item-btn-delete" onClick={() => handleRemoveItem(dishId)}>
							<i className="fas fa-trash"></i>
						</button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuOrderItem;
