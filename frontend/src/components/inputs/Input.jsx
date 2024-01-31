import React from "react";
import { useController } from "react-hook-form";
import { IconEyeOpen } from "../icons";

const Input = ({
  name = "",
  type = "text",
  children,
  control,
  ...props
}) => {
  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });
  return (
    <div className="relative w-full">
      <input
        className={`w-full ${children ? 'p-5 pr-[60px]' : 'p-5'} bg-grayLight rounded-md placeholder-placeholderColor font-[500] border-transparent border-[1px] focus:bg-white focus:border-primaryff transition duration-200 ease-linear`}
        id={name}
        type={type}
        {...field}
        {...props}
      />
      {children}
    </div>
  );
};

export default Input;
