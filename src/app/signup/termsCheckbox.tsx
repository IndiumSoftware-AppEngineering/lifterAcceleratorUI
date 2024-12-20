import { TermsCheckboxProps } from "../dashboard/_constants/type";

export default function TermsCheckbox({
  isAgreed,
  onChange,
}: TermsCheckboxProps) {
  return (
    <div className="flex items-center space-x-2">
      <input
        type="checkbox"
        id="terms"
        checked={isAgreed}
        onChange={(e) => onChange(e.target.checked)}
        className="form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out"
      />
      <label htmlFor="terms" className="text-sm text-gray-700 cursor-pointer">
        By Signing up, I agree with the{" "}
        <a
          href="#"
          className="text-[#4A84ED] hover:text-indigo-500 transition-colors duration-300"
        >
          terms and conditions
        </a>
      </label>
    </div>
  );
}
