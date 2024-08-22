import React from "react";

export type ButtonProps = {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  buttonDetails: ButtonDetails;
};

export type ButtonDetails = {
  name: string;
  type?: "button" | "reset" | "submit";
  isLoading?: boolean;
  isDisabled?: boolean;
};

const SimpleButton: React.FC<ButtonProps> = ({ onClick, buttonDetails }) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) onClick(event);
  };

  return (
    <button
      onClick={handleClick}
      type={buttonDetails.type ?? "button"}
      className="mb-2 me-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-l focus:outline-none focus:ring-4 focus:ring-purple-200 dark:focus:ring-purple-800"
      disabled={buttonDetails.isDisabled ?? false}
    >
      {buttonDetails.name}
    </button>
  );
};

export default SimpleButton;
