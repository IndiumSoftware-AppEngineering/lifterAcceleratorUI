import { EyeOff, Eye } from 'lucide-react';
import { InputFieldProps } from '../dashboard/_constants/type';

export default function InputField({
  label,
  type,
  placeholder,
  value,
  error,
  showPasswordToggle,
  showForgotPassword,
  isTouched,
  onChange,
  onBlur,
  togglePasswordVisibility,
  toggleForgotPassword,
}: InputFieldProps) {
  return (
    <div>
      <div className='flex items-center justify-between mb-1'>
        <label htmlFor={label} className='block text-sm font-medium text-gray-700'>
          {label}
        </label>
        {showForgotPassword && (
          <a
            className='text-sm text-[#4A84ED] hover:text-indigo-500 transition-colors duration-300 cursor-pointer'
            onClick={toggleForgotPassword}
          >
            Forgot Password?
          </a>
        )}
      </div>
      <div className='relative rounded-md shadow-sm'>
        <input
          id={label}
          type={type}
          className={`
            block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm 
            focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-base 
            transition-all duration-300 ease-in-out
            ${error ? 'border-red-500' : 'hover:border-blue-500'}
          `}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          autoComplete='off'
          required
        />
        {showPasswordToggle && (
          <button
            type='button'
            onClick={togglePasswordVisibility}
            className='absolute inset-y-0 right-0 pr-3 flex items-center'
          >
            {type === 'password' ? (
              <Eye className='h-5 w-5 text-gray-400 hover:scale-110 transition-transform duration-300' />
            ) : (
              <EyeOff className='h-5 w-5 text-gray-400 hover:scale-110 transition-transform duration-300' />
            )}
          </button>
        )}
      </div>
      {error && isTouched && (
        <p className='mt-2 text-sm text-red-600 animate-shake'>{error}</p>
      )}
    </div>
  );
}