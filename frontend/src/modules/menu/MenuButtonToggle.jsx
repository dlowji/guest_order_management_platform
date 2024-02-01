import React from "react";
import { Toggle } from "../../components/toggles";
import Swal from "sweetalert2";

const MenuButtonToggle = ({ isAvailable = false, dishId }) => {
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
        console.log("update dish status");
      }
    });
  };

  return <Toggle on={isAvailable} onClick={handleToggle}></Toggle>;
};

export default MenuButtonToggle;
