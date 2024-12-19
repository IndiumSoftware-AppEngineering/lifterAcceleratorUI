"use client";

import { useState, ChangeEvent, FormEvent, FocusEvent } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { EMAIL_REGEX } from "@/app/dashboard/_constants/constants";
import { useLogin } from "@/components/apiintegrations/useLogin";
import { useForgotPassword } from "@/components/apiintegrations/useForgotPassword";
import SignInButton from "./signInButton";
import InputField from "./inputFields";

export default function LoginForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");
  const [isEmailTouched, setIsEmailTouched] = useState<boolean>(false);
  const [isPasswordTouched, setIsPasswordTouched] = useState<boolean>(false);
  const [isConfirmPasswordTouched, setIsConfirmPasswordTouched] =
    useState<boolean>(false);
  const [isForgotPassword, setIsForgotPassword] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const router = useRouter();
  const { login, error: loginError } = useLogin();
  const { forgotPassword, error: forgotPasswordError } = useForgotPassword();

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError(value ? "" : "Email is required");
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordError(value ? "" : "Password is required");
  };

  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfirmPassword(value);
    setConfirmPasswordError(value ? "" : "Confirm Password is required");
  };

  const handleEmailBlur = (e: FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setIsEmailTouched(true);
    if (!value) {
      setEmailError("Email is required");
    } else if (!EMAIL_REGEX.test(value)) {
      setEmailError("Invalid email");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordBlur = (e: FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setIsPasswordTouched(true);
    setPasswordError(value ? "" : "Password is required");
  };

  const handleConfirmPasswordBlur = (e: FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setIsConfirmPasswordTouched(true);
    if (!value) {
      setConfirmPasswordError("Confirm Password is required");
    } else if (value !== password) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError("");
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (!email || !EMAIL_REGEX.test(email)) {
      setEmailError(!email ? "Email is required" : "Invalid email");
      return;
    }
  
    if (isForgotPassword) {
      if (!password || !confirmPassword || password !== confirmPassword) {
        setPasswordError(!password ? "Password is required" : "");
        setConfirmPasswordError(
          !confirmPassword
            ? "Confirm Password is required"
            : "Passwords do not match"
        );
        return;
      }
  
      const result = await forgotPassword(email, password, confirmPassword);
      if (result && result.message === "Password updated successfully") {
        setSuccessMessage("Password Updated")
        setTimeout(() => {
          setSuccessMessage(null);
          router.push("/loginpage");
        }, 1500);
      }
    } else {
      if (!password) {
        setPasswordError("Password is required");
        return;
      }
  
      const loginResult = await login(email, password);
      if (loginResult && loginResult.message === "Login successful") {
        setSuccessMessage("Login successful");
        setTimeout(() => {
          setSuccessMessage(null);
          router.push("/dashboard");
        }, 1500);
      }
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);
  const toggleForgotPassword = () => setIsForgotPassword(!isForgotPassword);

  const isResetPasswordEnabled =
    password === confirmPassword && password.length > 0;

  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4 w-[450px] py-8 transition-all duration-500 ease-in-out">
        <div className="w-full max-w-4xl space-y-6 transition-all duration-500 ease-in-out">
          <div className="flex flex-col items-center space-y-6">
            <div
              className={`flex items-center justify-center transition-all duration-500 ease-in-out ${
                isEmailTouched ? "rotate-[360deg] scale-110" : ""
              }`}
            >
              <Image
                src="/assets/logo.svg"
                width={60}
                height={60}
                alt="logo"
                className="transition-all duration-500 ease-in-out hover:scale-110"
              />
            </div>
            <h1 className="text-3xl font-bold text-center animate-fade-in">
              {isForgotPassword ? "Reset Password" : "Login to Gen AI"}
            </h1>
            {!isForgotPassword && (
              <>
                <SignInButton
                  type="button"
                  isLogin={false}
                  isForgotPassword={false}
                  isResetPasswordEnabled={true}
                />
                <div className="flex items-center justify-center w-full">
                  <hr className="w-full border-t border-gray-300" />
                  <span className="px-4 text-sm text-gray-500 bg-gray-50 whitespace-nowrap cursor-pointer hover:text-black hover:font-semi-bold">
                    or sign in with your email
                  </span>
                  <hr className="w-full border-t border-gray-300" />
                </div>
              </>
            )}
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <InputField
              label="Email Address"
              type="email"
              placeholder="Email Address"
              value={email}
              error={emailError}
              isTouched={isEmailTouched}
              onChange={handleEmailChange}
              onBlur={handleEmailBlur}
            />
            {(isForgotPassword || !isForgotPassword) && (
              <InputField
                label="Password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                error={passwordError}
                isTouched={isPasswordTouched}
                onChange={handlePasswordChange}
                onBlur={handlePasswordBlur}
                showPasswordToggle
                showForgotPassword={!isForgotPassword}
                togglePasswordVisibility={togglePasswordVisibility}
                toggleForgotPassword={toggleForgotPassword}
              />
            )}
            {isForgotPassword && (
              <InputField
                label="Confirm Password"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                error={confirmPasswordError}
                isTouched={isConfirmPasswordTouched}
                onChange={handleConfirmPasswordChange}
                onBlur={handleConfirmPasswordBlur}
                showPasswordToggle
                togglePasswordVisibility={toggleConfirmPasswordVisibility}
              />
            )}
            <SignInButton
              type="submit"
              isLogin={!isForgotPassword}
              isForgotPassword={isForgotPassword}
              isResetPasswordEnabled={isResetPasswordEnabled}
            />
          </form>
          {(loginError || forgotPasswordError) && (
            <p className="mt-2 text-sm text-red-600 animate-shake">
              {loginError || forgotPasswordError}
            </p>
          )}
          {successMessage && (
            <p className="mt-2 text-sm text-green-600 animate-shake font-bold">
              {successMessage}
            </p>
          )}
          <p className="text-center text-base text-gray-600">
            {isForgotPassword ? (
              <>
                Remember your password?{" "}
                <button
                  onClick={toggleForgotPassword}
                  className="font-medium text-[#4A84ED] hover:text-indigo-500 transition-colors duration-300"
                >
                  Log In
                </button>
              </>
            ) : (
              <>
                New to Indium Gen AI?{" "}
                <button
                  onClick={() => router.push("/signup")}
                  className="font-medium text-[#4A84ED] hover:text-indigo-500 transition-colors duration-300"
                >
                  Register
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </main>
  );
}
