import { Toggle } from "../../components/toggles";
import Swal from "sweetalert2";
import PropTypes from "prop-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import kitchenApi from "../../api/kitchen";

const MenuButtonToggle = ({ isAvailable = false, dishId }) => {
  const queryClient = useQueryClient();
  const { mutate: updateDishAvailability } = useMutation({
    mutationFn: (dishId) => {
      return kitchenApi.toggleDishStatus(dishId);
    },
    onSuccess: (data) => {
      if (data.code === 200) {
        queryClient.refetchQueries(["menuItems"]);
        Swal.fire("Success!", "Dish status has been updated.", "success");
        return;
      } else {
        Swal.fire(
          "Error!",
          data?.message || "Error! Please try again later",
          "error"
        );
      }
    },
    onError: () => {
      Swal.fire("Error!", "Something went wrong.", "error");
    },
  });
  const handleToggle = () => {
    Swal.fire({
      title: "Are you sure?",
      text: isAvailable
        ? "Do you want to disable this dish?"
        : "Do you want to enable this dish?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, do it!",
    }).then((result) => {
      if (result.isConfirmed) {
        updateDishAvailability();
      }
    });
  };

  return <Toggle on={isAvailable} onClick={handleToggle}></Toggle>;
};

MenuButtonToggle.propTypes = {
  isAvailable: PropTypes.bool,
  dishId: PropTypes.string,
};

export default MenuButtonToggle;
