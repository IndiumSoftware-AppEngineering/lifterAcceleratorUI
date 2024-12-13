"use client";

import { useState, ChangeEvent, FormEvent, FocusEvent } from "react";
import { EyeOff, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface SignInButtonProps {
  type: "button" | "submit" | "reset";
  isLogin: boolean;
}

export default function LoginForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [isEmailTouched, setIsEmailTouched] = useState<boolean>(false);
  const [isPasswordTouched, setIsPasswordTouched] = useState<boolean>(false);
  const router = useRouter();

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    if (value) {
      setEmailError("");
    }
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);

    if (value) {
      setPasswordError("");
    }
  };

  const handleEmailBlur = (e: FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setIsEmailTouched(true);

    if (!value) {
      setEmailError("Email is required");
    } else if (!validateEmail(value)) {
      setEmailError("Invalid email");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordBlur = (e: FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setIsPasswordTouched(true);

    if (!value) {
      setPasswordError("Password is required");
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate email
    if (!email) {
      setEmailError("Email is required");
      return;
    } else if (!validateEmail(email)) {
      setEmailError("Invalid email");
      return;
    }

    // Validate password
    if (!password) {
      setPasswordError("Password is required");
      return;
    }

    console.log("Submitting:", email, password);
    router.push("/gridLayout");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      className={`
        flex justify-center items-center min-h-screen bg-gray-50 p-4 w-[450px] py-8 
        transition-all duration-500 ease-in-out
      `}
    >
      <div
        className={`
          w-full max-w-4xl space-y-6
          transition-all duration-500 ease-in-out
        `}
      >
        <div className="flex flex-col items-center space-y-6">
          <div
            className={`
              flex items-center justify-center 
              transition-all duration-500 ease-in-out 
              ${isEmailTouched ? "rotate-[360deg] scale-110" : ""}
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
          <h1 className="text-3xl font-bold text-center animate-fade-in">
            Login to Gen AI
          </h1>
          <SignInButton type="button" isLogin={false} />
          <div className="flex items-center justify-center w-full">
            <hr className="w-full border-t border-gray-300" />
            <span className="px-4 text-sm text-gray-500 bg-gray-50 whitespace-nowrap cursor-pointer hover:text-black hover:font-semi-bold">
              or sign in with your email
            </span>

            <hr className="w-full border-t border-gray-300" />
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              className={`
                block w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm
                focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-base
                transition-all duration-300 ease-in-out
                ${emailError ? "border-red-500" : "hover:border-blue-500"}
              `}
              placeholder="Email Address"
              value={email}
              onChange={handleEmailChange}
              onBlur={handleEmailBlur}
              autoComplete="off"
              required
            />

            {emailError && isEmailTouched && (
              <p className="mt-2 text-sm text-red-600 animate-shake">
                {emailError}
              </p>
            )}
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <a
                href="#"
                className="text-sm text-[#4A84ED] hover:text-indigo-500 transition-colors duration-300"
              >
                Forgot Password?
              </a>
            </div>
            <div className="relative rounded-md shadow-sm">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className={`
                  block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm 
                  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-base 
                  transition-all duration-300 ease-in-out
                  ${passwordError ? "border-red-500" : "hover:border-blue-500"}
                `}
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                onBlur={handlePasswordBlur}
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
          <SignInButton type="submit" isLogin={true} />
        </form>
        <p className="text-center text-base text-gray-600">
          New to Indium Gen AI?{" "}
          <button
            onClick={() => router.push("/signup")}
            className="font-medium text-[#4A84ED] hover:text-indigo-500 transition-colors duration-300"
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
}

const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

function SignInButton({ type, isLogin }: SignInButtonProps) {
  return (
    <Button
      type={type}
      className={`
        w-full py-3 px-4 border rounded-md shadow-sm text-base font-medium
        focus:outline-none focus:ring-2 focus:ring-offset-2
        transition-all duration-300 ease-in-out
        hover:scale-[1.02] active:scale-95
        font-sma
        ${
          isLogin
            ? "text-white"
            : "text-[#000000] bg-white border-gray-300 hover:bg-gray-50 focus:ring-indigo-500 font-medium"
        }
      `}
      style={
        isLogin
          ? {
              background:
                "transparent linear-gradient(263deg, #47F3D0 0%, #278EF1 52%, #CB5EDC 100%) 0% 0% no-repeat padding-box",
            }
          : undefined
      }
    >
      {isLogin ? "Log In" : "Sign In using Microsoft"}
    </Button>
  );
}