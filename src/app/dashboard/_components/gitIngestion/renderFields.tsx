import React, { useState } from "react";
import { RenderFieldsProps } from "../../_constants/type";

export const RenderFields: React.FC<RenderFieldsProps> = ({
  fields,
  formErrors,
  onChange,
  onBlur,
}) => {
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});
  const [uploadedFileName, setUploadedFileName] = useState<Record<string, string>>({});

  const handleBlur = (field: string, value: string) => {
    setTouchedFields((prev) => ({ ...prev, [field]: true }));
    onBlur(field, value);
  };

  const handleFileChange = (field: string, file: File | null) => {
    if (file) {
      setUploadedFileName((prev) => ({ ...prev, [field]: file.name }));
      onChange(field, file.name); 
    }
  };

  return (
    <div>
      {fields.map((field) => (
        <div key={field} className="mb-1">
          {field === "Upload Zip" ? (
            <div>
              <input
                type="file"
                accept=".zip"
                className="p-2 border rounded text-sm w-full border-gray-300"
                onChange={(e) => handleFileChange(field, e.target.files?.[0] || null)}
              />
              {uploadedFileName[field] && (
                <p className="text-gray-700 text-sm mt-1">Uploaded: {uploadedFileName[field]}</p>
              )}
            </div>
          ) : (
            <input
              type="text"
              placeholder={field}
              className={`p-2 border rounded text-sm w-full ${
                touchedFields[field] && formErrors[field]
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              onChange={(e) => onChange(field, e.target.value)}
              onBlur={(e) => handleBlur(field, e.target.value)}
            />
          )}
          {touchedFields[field] && formErrors[field] && (
            <p className="text-red-500 text-xs mt-1">{formErrors[field]}</p>
          )}
        </div>
      ))}
    </div>
  );
};
