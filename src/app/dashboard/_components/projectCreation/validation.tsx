import { FormData, FormErrors } from '../../_constants/type';

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

  // Validate Status
  if (!formData.status) {
    errors.status = 'Status is required.';
  } else if (!['Active', 'Inactive'].includes(formData.status)) {
    errors.status = 'Invalid status. Must be "Active" or "Inactive".';
  }

  // Validate Description (optional)
  if (formData.description && formData.description.length > 500) {
    errors.description = 'Description cannot exceed 500 characters.';
  }

  // Set errors
  setFormErrors(errors);

  // Return true if there are no errors
  return Object.keys(errors).length === 0;
};
