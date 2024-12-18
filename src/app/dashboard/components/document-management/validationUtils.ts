export const validateField = (
    field: string,
    value: string,
    formErrors: Record<string, string>
  ): Record<string, string> => {
    const errors = { ...formErrors };
  
    if (!value.trim() && field !== "Upload Zip") {
      errors[field] = "This field is required.";
    } else if (field === "Git URL" && !isValidUrl(value.trim())) {
      errors[field] = "This is not a valid URL.";
    } else {
      delete errors[field];
    }
  
    return errors;
  };
  
  export const validateForm = (
    selectedFields: string[],
    formData: Record<string, string>
  ): Record<string, string> => {
    let errors: Record<string, string> = {};
  
    selectedFields.forEach((field) => {
      const value = formData[field] || "";
      errors = validateField(field, value, errors);
    });
  
    return errors;
  };
  
  const isValidUrl = (url: string): boolean => {
    const urlPattern = /^(https?:\/\/[^\s$.?#].[^\s]*)$/;
    return urlPattern.test(url);
  };