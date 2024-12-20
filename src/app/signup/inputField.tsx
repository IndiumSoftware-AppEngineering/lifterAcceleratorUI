import { Eye, EyeOff } from "lucide-react";
import { InputRegisterFieldProps } from "../dashboard/_constants/type";
export default function InputField({
  label,
  type,
  name,
  value,
  error,
  showPasswordToggle,
  isTouched,
  onChange,
  onBlur,
  togglePasswordVisibility,
}: InputRegisterFieldProps) {
  return (
    <div className="mb-4">
      <label
        className="block text-sm font-medium text-gray-700 mb-1"
        htmlFor={name}
      >
        {label}
      </label>
      <div className="relative">
        <input
          className={`
            block w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm
            focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-base
            transition-all duration-300 ease-in-out
            ${error ? "border-red-500" : "hover:border-blue-500"}
          `}
          id={name}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          autoComplete="off"
          required
        />
        {showPasswordToggle && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            {type === "password" ? (
              <Eye className="h-5 w-5 text-gray-400 hover:scale-110 transition-transform duration-300" />
            ) : (
              <EyeOff className="h-5 w-5 text-gray-400 hover:scale-110 transition-transform duration-300" />
            )}
          </button>
        )}
      </div>
      {error && isTouched && (
        <p className="mt-2 text-sm text-red-600 animate-shake">{error}</p>
      )}
    </div>
  );
}