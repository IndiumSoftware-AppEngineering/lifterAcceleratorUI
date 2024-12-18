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
