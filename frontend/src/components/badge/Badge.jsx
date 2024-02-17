import React from "react";
import PropTypes from "prop-types";
const Badge = ({ variant, className = "", content = "" }) => {
  const classNameByVariant = React.useMemo(() => {
    switch (variant) {
      case "primary":
        return "border-primaryff text-white bg-primaryff border-primaryff";
      case "secondary":
        return "border-secondaryff text-white bg-secondaryff border-secondaryff";
      case "success":
        return "bg-green-100 text-black border-green-400";
      case "danger":
        return "bg-red-100 text-white border-red-400";
      case "warning":
        return "bg-yellow-100 text-white border-yellow-400";
      case "info":
        return "bg-blue-100 text-white border-blue-400";
      case "light":
        return "bg-gray-100 text-white border-gray-400";
      case "dark":
        return "bg-gray-800 text-white border-gray-400";
      default:
        return "";
    }
  }, [variant]);
  return (
    <span
      className={`text-xs font-medium mr-2 px-2.5 py-0.5 rounded border ${classNameByVariant} ${className}`}
    >
      {content}
    </span>
  );
};

Badge.propTypes = {
  variant: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "danger",
    "warning",
    "info",
    "light",
    "dark",
  ]).isRequired,
  className: PropTypes.string,
  content: PropTypes.string,
};
export default Badge;
