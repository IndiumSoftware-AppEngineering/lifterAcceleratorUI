import { FormData, FormErrors } from "../../_constants/type";

export const validateForm = (
  formData: FormData,
  setFormErrors: React.Dispatch<React.SetStateAction<FormErrors>>
): boolean => {
  const errors: FormErrors = {};

  // Validate Project Name
  if (!formData.name.trim()) {
    errors.name = 'Project name is required.';
  } else if (formData.name.length < 4) {
    errors.name = 'Project name must be at least 4 characters long.';
  } else if (!/^[a-zA-Z0-9\s]+$/.test(formData.name)) {
    errors.name =
      'Project name must contain only letters, numbers, and spaces.';
  }

  // Validate Project ID
  if (!formData.id.trim()) {
    errors.id = 'Project ID is required.';
  } else if (!formData.id.startsWith('#')) {
    errors.id = 'Project ID must start with "#".';
  } else if (formData.id.length < 3) {
    errors.id = 'Project ID must be at least 3 characters long.';
  }

  setFormErrors(errors);
  return Object.keys(errors).length === 0;
};
