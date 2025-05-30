import React from "react";

interface AddButtonProps {
  onClick: () => void;
  className?: string;
  label: string;
}

const AddButton = ({ onClick, label, className = "" }: AddButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={` ${className} cursor-pointer bg-primary hover:bg-secondary text-white text-sm px-5 py-2 rounded-lg shadow transition-all duration-200`}
    >
      {label}
    </button>
  );
};

export default AddButton;
