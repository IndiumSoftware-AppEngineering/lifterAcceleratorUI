"use client";

import { useState, ChangeEvent, FormEvent, FocusEvent } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { EMAIL_REGEX, PASSWORD_MIN_LENGTH } from "../dashboard/_constants/constants";
import { registerUser } from "@/app/signup/_api/register";
import SignUpButton from "./signUpButton";
import InputField from "./inputField";
import TermsCheckbox from "./termsCheckbox";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    org_id: 1,
    created_by: "admin@example.com",
    created_on: new Date().toISOString(),
  });

  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isAgreed, setIsAgreed] = useState<boolean>(false);
  const [isEmailTouched, setIsEmailTouched] = useState<boolean>(false);
  const [isPasswordTouched, setIsPasswordTouched] = useState<boolean>(false);
  const [registrationError, setRegistrationError] = useState<string | null>(null);
  const [registrationSuccess, setRegistrationSuccess] = useState<boolean>(false);
  const router = useRouter();

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
      if (!EMAIL_REGEX.test(value)) {
        setEmailError("Invalid email");
      } else {
        setEmailError("");
      }
    } else if (type === "password") {
      setIsPasswordTouched(true);
      if (value.length < PASSWORD_MIN_LENGTH) {
        setPasswordError("Password must be at least 6 characters");
      } else {
        setPasswordError("");
      }
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!EMAIL_REGEX.test(formData.email)) {
      setEmailError("Invalid email");
      return;
    }

    if (formData.password.length < PASSWORD_MIN_LENGTH) {
      setPasswordError("Password must be at least 6 characters");
      return;
    }

    try {
      const payload = {
        name: formData.name,
        username: formData.username,
        email_id: formData.email,
        password: formData.password,
        org_id: formData.org_id,
        created_by: formData.created_by,
        created_on: formData.created_on,
      };

      const response = await registerUser(payload);
      setRegistrationSuccess(true);
      setRegistrationError(null);
      console.log("Registration successful:", response);

      // Reset form fields
      setFormData({
        name: "",
        username: "",
        email: "",
        password: "",
        org_id: 1,
        created_by: "admin@example.com",
        created_on: new Date().toISOString(),
      });
      setEmailError(null);
      setPasswordError(null);
      setIsEmailTouched(false);
      setIsPasswordTouched(false);
      setIsAgreed(false);

      // Show success message for 1500ms and redirect
      setTimeout(() => {
        setRegistrationSuccess(false);
        router.push("/login");
      }, 1500);
    } catch (error) {
      if (error instanceof Error) {
        setRegistrationError(error.message);
      } else {
        setRegistrationError("An unexpected error occurred");
      }
      setRegistrationSuccess(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4 w-full py-8 flex-col">
      <div className="w-[450px] max-w-full space-y-6 transition-all duration-500 ease-in-out">
        <div className="flex flex-col items-center space-y-6">
          <div className="flex items-center justify-center transition-all duration-500 ease-in-out">
            <Image
              src="/assets/logo.svg"
              width={60}
              height={60}
              alt="logo"
              className="transition-all duration-500 ease-in-out hover:scale-110"
            />
          </div>
          <h2 className="text-3xl font-bold text-center animate-fade-in">
            Register Your Account
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex gap-4 mb-6">
            <InputField
              label="Name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <InputField
              label="Username"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          <InputField
            label="Email Address"
            type="email"
            name="email"
            value={formData.email}
            error={emailError}
            isTouched={isEmailTouched}
            onChange={handleChange}
            onBlur={(e) => handleBlur(e, "email")}
          />

          <InputField
            label="Password"
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            error={passwordError}
            isTouched={isPasswordTouched}
            onChange={handleChange}
            onBlur={(e) => handleBlur(e, "password")}
            showPasswordToggle
            togglePasswordVisibility={togglePasswordVisibility}
          />

          <TermsCheckbox isAgreed={isAgreed} onChange={setIsAgreed} />

          {registrationError && (
            <p className="mt-2 text-sm text-red-600 animate-shake">
              {registrationError}
            </p>
          )}

          {registrationSuccess && (
            <p className="mt-2 text-sm text-green-600 animate-fade-in font-bold">
              Registration successful!
            </p>
          )}

          <div className="flex flex-col space-y-6">
            <SignUpButton isAgreed={isAgreed} />

            <div className="text-center">
              <a href="#" className="text-sm">
                <span className="font-medium text-center text-base text-black-600">
                  Already have an account?{" "}
                </span>
                <span
                  className="font-medium text-[#4A84ED] hover:text-indigo-500 transition-colors duration-300 cursor-pointer"
                  onClick={() => router.push("/login")}
                >
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