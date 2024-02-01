import React from "react";

const MenuButtonAddToCart = ({ dishId, image, title, price }) => {
  const handleAddToCart = () => {};
  return (
    <button className="menu-item-button" onClick={handleAddToCart}>
      Add to cart
    </button>
  );
};

export default MenuButtonAddToCart;
