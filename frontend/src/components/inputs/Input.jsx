// eslint-disable-next-line no-unused-vars
import React from "react";
import { useController } from "react-hook-form";

const Input = ({ id, control, name, type = "text", placeholder, children }) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    rules: { required: true },
    defaultValue: "",
  });
  return (
    <>
      <div className="relative w-full">
        <input
          id={id !== undefined ? id : name}
          type={type}
          className={`w-full ${children ? 'p-5 pr-[60px]' : 'p-5'} bg-grayLight rounded-md placeholder-placeholderColor font-[500] border-transparent border-[1px] focus:bg-white focus:border-primaryff transition duration-200 ease-linear outline-none
          ${
            error?.message
              ? " !border-error !text-error !focus:border-error"
              : ""
          }
        `}
          placeholder={!error ? placeholder : ""}
          {...field}
        />
        {children && (
          <span className="absolute cursor-pointer select-none right-6 top-2/4 -translate-y-2/4">
            {children}
          </span>
        )}
      </div>
      {error && error.message && (
        <span className="capitalize-first block text-sm font-semibold pointer-events-none text-error ">
          {error.message}
        </span>
      )}
    </>
  );
};

export default Input;
