import { useParams } from "react-router-dom";
import { useOrderState } from "../../stores/useOrderState";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

const MenuButtonAddToCart = ({ dishId, image, title, price }) => {
  const { id: idParams } = useParams();
  const addToCart = useOrderState((state) => state.addToOrder);
  const handleAddToCart = () => {
    if (!idParams) {
      toast.error("Please choose a table first");
      return;
    }
    addToCart({
      dishId,
      quantity: 1,
      price,
      image,
      note: "",
      title,
    });
  };
  return (
    <button className="menu-item-button" onClick={handleAddToCart}>
      Add to cart
    </button>
  );
};

MenuButtonAddToCart.propTypes = {
  dishId: PropTypes.string,
  image: PropTypes.string,
  title: PropTypes.string,
  price: PropTypes.number,
};

export default MenuButtonAddToCart;
