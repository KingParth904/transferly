import { ReactElement } from "react";

interface ButtonProps {
  variant: "primary" | "secondary";
  text: string;
  onClick?: () => void;
  loading?: boolean;
  type?: "submit" | "reset" | "button";
  disabled?: boolean;
  startIcon?: ReactElement;
}

const baseStyle = 
  "px-6 py-2.5 rounded-md font-medium flex items-center justify-center gap-2 cursor-pointer transition-all duration-200 ease-in-out shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900";

const disabledStyle = "opacity-60 cursor-not-allowed shadow-none";

const variantStyles = {
  primary: "bg-teal-500 text-white hover:bg-teal-600 hover:shadow-lg focus:ring-teal-500",
  secondary: "bg-gray-700 text-gray-100 hover:bg-gray-600 focus:ring-gray-500",
};

export function Button({
  text,
  onClick,
  variant,
  loading,
  type = "button",
  disabled,
  startIcon,
}: ButtonProps) {
  
  const isDisabled = disabled || loading;

  const combinedClassName = `
    ${baseStyle} 
    ${variantStyles[variant]}
    ${isDisabled ? disabledStyle : ""}
  `;

  return (
    <button
      className={combinedClassName.trim()}
      onClick={onClick}
      disabled={isDisabled} 
      aria-busy={loading}
      type={type}
    >
      {loading ? (
        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : (
        <>
          {startIcon}
          <span>{text}</span>
        </>
      )}
    </button>
  );
}
