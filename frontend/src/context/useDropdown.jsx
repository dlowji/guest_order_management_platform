import React from "react";

const DropdownContext = React.createContext();

const DropdownProvider = (props) => {
  const [show, setShow] = React.useState(false);
  const handleToggleDropdown = () => {
    setShow(!show);
  };
  return (
    <DropdownContext.Provider value={{ show, handleToggleDropdown, setShow }}>
      {props.children}
    </DropdownContext.Provider>
  );
};

function useDropdown() {
  const context = React.useContext(DropdownContext);
  if (typeof context === "undefined" || context === null)
    throw new Error("useDropdown must be used within DropdownProvider");
  return context;
}

export default { useDropdown, DropdownProvider };
