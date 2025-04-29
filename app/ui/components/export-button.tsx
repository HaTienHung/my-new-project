import React from "react";

interface ExportButtonProps {
  onClick: () => void;
  loading: boolean;
  className?: string;
}

const ExportButton = ({ onClick, loading, className = "" }: ExportButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`text-sm px-4 py-2 rounded-lg bg-white border border-solid border-primary  ${className} ${loading
        ? 'bg-gray-200 text-primary cursor-not-allowed'
        : 'text-primary hover:bg-[#f7f4f0]'
        } transition`}
    >
      {loading ? 'Đang xuất...' : 'Export (.xlsx)'}
    </button>
  );
};

export default ExportButton;
