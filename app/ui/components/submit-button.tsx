import React from "react";

interface SubmitButtonProps {
  label: string;
  loading?: boolean;
  className?: string;
}

const SubmitButton = ({
  label,
  loading = false,
  className = "",
}: SubmitButtonProps) => {
  return (
    <button
      type="submit"
      className={`bg-primary hover:bg-opacity-90 text-white text-sm px-5 py-2 rounded-xl shadow transition-all duration-200 hover:underline cursor-pointer ${className} ${loading ? "disable" : " "}`}
    >
      {label}
    </button>
  );
};

export default SubmitButton;
