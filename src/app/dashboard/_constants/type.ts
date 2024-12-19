import { ChangeEvent, FocusEvent } from "react";

export interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  successIcon: string;
}

export interface CreateProjectDrawerContentProps {
  onSubmit: (data: FormData) => void;
  onCancel: () => void;
  handleAddArtifacts: () => void;
}

export interface FormData {
  name: string;
  id: string;
  description: string;
  status: string;
}

export interface FormFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
}

export interface StatusDropdownProps {
  status: string;
  setFormData: (
    formData: React.SetStateAction<{
      name: string;
      id: string;
      description: string;
      status: string;
    }>
  ) => void;
}

export interface FormErrors {
  name?: string;
  id?: string;
}

export interface ArtifactOption {
  id: string;
  Icon: React.ElementType;
  label: string;
  dropdownOptions?: string[];
}

export interface DropdownOption {
  id: string;
  label: string;
  fields: string[];
}
export interface ArtifactSelectorProps {
  selectedIcon: string | null;
  onIconClick: (id: string) => void;
  selectedOption: string | null;
  onOptionSelect: (option: string | null) => void;
}
export interface dropDownMenuProps {
  selectedOption: string | null;
  onOptionSelect: (option: string | null) => void;
}
export interface RenderFieldsProps {
  fields: string[];
  formErrors: Record<string, string>;
  onChange: (field: string, value: string) => void;
  onBlur: (field: string, value: string) => void;
}
export interface Registration {
  id: bigint;
  username: string;
  surname: string;
  email: string;
  password: string;
  phone: string;
  created_on: Date;
  modified_by: string;
  modified_on: Date;
}

export interface ForgotPasswordPayload {
  email: string;
  newPassword: string;
  confirmPassword: string;
}
export interface LoginPayload {
  email: string;
  password: string;
}
export interface SignupPayload {
  username: string;
  surname: string;
  email: string;
  password: string;
  phone: string;
}
export interface InputFieldProps {
  label: string;
  type: string;
  placeholder: string;
  value: string;
  error: string;
  showPasswordToggle?: boolean;
  showForgotPassword?: boolean;
  isTouched: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: FocusEvent<HTMLInputElement>) => void;
  togglePasswordVisibility?: () => void;
  toggleForgotPassword?: () => void;
}
export interface SignInButtonProps {
  type: 'button' | 'submit' | 'reset';
  isLogin: boolean;
  isForgotPassword: boolean;
  isResetPasswordEnabled: boolean;
}
export interface SignUpButtonProps {
  isAgreed: boolean;
  onClick?: () => void;
}
export interface InputRegisterFieldProps {
  label: string;
  type: string;
  name: string;
  value: string;
  error?: string | null;
  showPasswordToggle?: boolean;
  isTouched?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  togglePasswordVisibility?: () => void;
}
export interface TermsCheckboxProps {
  isAgreed: boolean;
  onChange: (checked: boolean) => void;
}