"use client";
import { useState, ChangeEvent, FormEvent, FocusEvent } from "react";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    phoneNumber: "",
    email: "",
    password: "",
  });

  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isFormFocused, setIsFormFocused] = useState<boolean>(false);
  const [isAgreed, setIsAgreed] = useState<boolean>(false);
  const [isEmailTouched, setIsEmailTouched] = useState<boolean>(false);
  const [isPasswordTouched, setIsPasswordTouched] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (name === "email") setEmailError(null);
    if (name === "password") setPasswordError(null);
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>, type: "email" | "password") => {
    const value = e.target.value;

    if (type === "email") {
      setIsEmailTouched(true); 
      if (!validateEmail(value)) {
        setEmailError("Invalid email");
      } else {
        setEmailError("");
      }
    } else if (type === "password") {
      setIsPasswordTouched(true); 
      if (!validatePassword(value)) {
        setPasswordError("Password must be at least 6 characters");
      } else {
        setPasswordError("");
      }
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateEmail(formData.email)) {
      setEmailError("Invalid email");
      return;
    }

    if (!validatePassword(formData.password)) {
      setPasswordError("Password must be at least 6 characters");
      return;
    }

    console.log("Form Data Submitted:", formData);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password: string): boolean => {
    return password.length >= 6;
  };

  return (
    <div
      className={`
        flex justify-center items-center min-h-screen bg-gray-50 p-4 w-full py-8 
        transition-all duration-500 ease-in-out flex-col
      `}
    >
      <div
        className={`
          w-[450px] max-w-full space-y-6
          transition-all duration-500 ease-in-out
          ${isFormFocused ? "transform translate-y-[-10px]" : ""}
        `}
      >
        <div className="flex flex-col items-center space-y-6">
          <div
            className={`
              flex items-center justify-center 
              transition-all duration-500 ease-in-out 
              ${isFormFocused ? "rotate-[360deg] scale-110" : ""}
            `}
          >
            <Image
              src="/images/logo.svg"
              width={60}
              height={60}
              alt="logo"
              className="transition-all duration-500 ease-in-out hover:scale-110"
            />
          </div>
          <h2 className="text-3xl font-bold text-center animate-fade-in">
            Register Your Account
          </h2>
          <Button
            type="button"
            className="w-full py-3 px-4 border rounded-md shadow-sm text-base font-medium
              focus:outline-none focus:ring-2 focus:ring-offset-2
              transition-all duration-300 ease-in-out
              hover:scale-[1.02] active:scale-95
              bg-[#F5F5F5] hover:bg-[#F5F5F5] text-[#000000]"
          >
            Sign up using Microsoft
          </Button>
          <div className="flex items-center justify-center w-full">
            <hr className="w-full border-t border-gray-300" />
            <span className="px-4 text-sm text-gray-500 bg-gray-50 whitespace-nowrap cursor-pointer hover:text-black hover:font-semi-bold">
              or sign up with your email
            </span>
            <hr className="w-full border-t border-gray-300" />
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
          onFocus={() => setIsFormFocused(true)}
          onBlur={() => setIsFormFocused(false)}
        >
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="block w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm 
               focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-base 
               transition-all duration-300 ease-in-out "
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                autoComplete="off"
                required
              />
            </div>

            <div className="flex-1">
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="surname"
              >
                Surname
              </label>
              <input
                className="block w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm 
 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-base 
 transition-all duration-300 ease-in-out "
                id="surname"
                type="text"
                name="surname"
                value={formData.surname}
                onChange={handleChange}
                autoComplete="off"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="phoneNumber"
            >
              Phone Number
            </label>
            <input
              className="block w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm 
 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-base 
 transition-all duration-300 ease-in-out "
              id="phoneNumber"
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              autoComplete="off"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              className={`
    block w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm
    focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-base
    transition-all duration-300 ease-in-out
    ${emailError ? "border-red-500" : "hover:border-blue-500"}
    ${isFormFocused ? "shadow-lg" : "shadow-sm"}
  `}
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={(e) => handleBlur(e, "email")}
              autoComplete="off"
              required
            />
            {emailError && isEmailTouched && (
              <p className="mt-2 text-sm text-red-600 animate-shake">
                {emailError}
              </p>
            )}
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="password"
              >
                Password
              </label>
              <a
                className="text-sm text-[#4A84ED] hover:text-indigo-500 transition-colors duration-300"
                href="#"
              >
                Forgot Password?
              </a>
            </div>
            <div className="relative">
              <input
                className={`
    block w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm
    focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-base
    transition-all duration-300 ease-in-out
    ${passwordError ? "border-red-500" : "hover:border-blue-500"}
    ${isFormFocused ? "shadow-lg" : "shadow-sm"}
  `}
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                onBlur={(e) => handleBlur(e, "password")}
                autoComplete="off"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? (
                  <Eye className="h-5 w-5 text-gray-400 hover:scale-110 transition-transform duration-300" />
                ) : (
                  <EyeOff className="h-5 w-5 text-gray-400 hover:scale-110 transition-transform duration-300" />
                )}
              </button>
            </div>
            {passwordError && isPasswordTouched && (
              <p className="mt-2 text-sm text-red-600 animate-shake">
                {passwordError}
              </p>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="terms"
              checked={isAgreed}
              onChange={(e) => setIsAgreed(e.target.checked)}
              className="form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out"
            />
            <label
              htmlFor="terms"
              className="text-sm text-gray-700 cursor-pointer"
            >
              By Signing up, I agree with the{" "}
              <a
                href="#"
                className="text-[#4A84ED] hover:text-indigo-500 transition-colors duration-300"
              >
                terms and conditions
              </a>
            </label>
          </div>

          <div className="flex flex-col space-y-6">
            <button
              className="w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              style={{
                background:
                  "transparent linear-gradient(263deg, #47F3D0 0%, #278EF1 52%, #CB5EDC 100%) 0% 0% no-repeat padding-box",
                opacity: isAgreed ? 1 : 0.2,
                cursor: isAgreed ? "pointer" : "not-allowed",
              }}
              type="submit"
              disabled={!isAgreed}
            >
              Register
            </button>

            <div className="text-center">
              <a href="#" className="text-sm">
                <span className="font-medium text-center text-base text-black-600">
                  Already have an account?{" "}
                </span>
                <span className="font-medium text-[#4A84ED] hover:text-indigo-500 transition-colors duration-300">
                  Log In
                </span>
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}