
"use client";

import { ReactElement, forwardRef, useId, useState } from "react";
import { Eye, EyeOff } from "lucide-react"; 

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string; 
  error?: string;
  startIcon?: ReactElement;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, type = "text", error, startIcon, className, ...props }, ref) => {
    const id = useId(); 
    
    const [showPassword, setShowPassword] = useState(false);

    const inputType = type === "password" && showPassword ? "text" : type;

    const endIcon =
      type === "password" ? (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="focus:outline-none"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      ) : null;

    const baseInputStyle = `
      flex h-10 w-full rounded-md border bg-gray-800 py-2 text-sm text-gray-100
      file:border-0 file:bg-transparent file:text-sm file:font-medium 
      placeholder:text-gray-500 
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500
      disabled:cursor-not-allowed disabled:opacity-50
    `;
    
    const errorStyle = "border-red-500 focus-visible:ring-red-500";
    const defaultBorderStyle = "border-gray-700";
    const startIconPadding = startIcon ? "pl-10" : "px-3";
    const endIconPadding = endIcon ? "pr-10" : "px-3";

    const combinedStyle = `
      ${baseInputStyle}
      ${error ? errorStyle : defaultBorderStyle}
      ${startIconPadding}
      ${endIconPadding}
      ${className}
    `;

    return (
      <div className="w-full">
        <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-1">
          {label}
        </label>
        
        <div className="relative">
          {startIcon && (
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              {startIcon}
            </div>
          )}
          <input
            id={id}
            type={inputType} 
            className={combinedStyle.trim()}
            ref={ref}
            {...props}
          />
         
          {endIcon && (
             <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
              {endIcon}
            </div>
          )}
        </div>

        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";
