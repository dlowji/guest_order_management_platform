import React from "react";
import CircleLoading from "../loadings/CircleLoading";
import { Link } from "react-router-dom";

const Button = ({
  type,
  className = "",
  children,
  onClick,
  href,
  isLoading = false,
  icon = <CircleLoading />,
  variant,
}) => {
  const child = isLoading ? icon : children;

  if (variant === "secondary") {
    className +=
      " bg-gray-200 text-gray-700 hover:bg-gray-300 focus:bg-gray-300 active:bg-gray-400";
  }

  if (href) {
    return (
      <Link
        to={href}
        className={`inline-block px-7 py-3 bg-orange-400 font-semibold text-sm leading-snug uppercase rounded shadow-md hover:bg-primaryff hover:shadow-lg focus:bg-primaryff focus:shadow-lg focus:outline-none focus:ring-0 active:bg-orange-700 active:shadow-lg transition duration-150 ease-in-out ${className}`}
        onClick={onClick}
      >
        {child}
      </Link>
    );
  }
  return (
    <button
      type={type}
      className={`inline-block px-7 py-3 bg-orange-400 font-semibold text-sm leading-snug uppercase rounded shadow-md hover:bg-primaryff hover:shadow-lg focus:bg-primaryff focus:shadow-lg focus:outline-none focus:ring-0 active:bg-orange-700 active:shadow-lg transition duration-150 ease-in-out ${className}`}
      onClick={onClick}
      disabled={isLoading}
    >
      {child}
    </button>
  );
};

export default Button;
