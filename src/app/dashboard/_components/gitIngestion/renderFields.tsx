import React, { useState, useEffect } from "react";
import { CheckCircle } from "lucide-react";
import { ArrowDropDown, ArrowDropDownCircleOutlined } from "@mui/icons-material";

interface DropdownOption {
  id: string;
  name: string;
}

interface RenderFieldsProps {
  fields: string[];
  formData: Record<string, string>;
  formErrors: Record<string, string>;
  onChange: (field: string, value: string) => void;
  onBlur: (field: string, value: string) => void;
  onReset: () => void;
}

export const RenderFields: React.FC<RenderFieldsProps> = ({
  fields,
  formData,
  formErrors,
  onChange,
  onBlur,
  onReset,
}) => {
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});
  const [uploadedFileName, setUploadedFileName] = useState<Record<string, string>>({});
  const [dropdownOptions, setDropdownOptions] = useState<DropdownOption[]>([
    { id: "1", name: "SPRINGBOOT" }
  ]);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleBlur = (field: string, value: string): void => {
    setTouchedFields((prev) => ({ ...prev, [field]: true }));
    onBlur(field, value);
  };

  const handleFileChange = (field: string, file: File | null): void => {
    if (file) {
      setUploadedFileName((prev) => ({ ...prev, [field]: file.name }));
      onChange(field, file.name);
    }
  };

  const handleOptionSelect = (option: DropdownOption): void => {
    setSelectedOption(option.id);
    onChange("DropDownField", option.name);
    setIsDropdownOpen(false);
  };

  async function fetchArtifactName(groupName: string): Promise<void> {
    if (!groupName) {
      setDropdownOptions([]);
      return;
    }

    try {
      const response = await fetch("/api/artifact-type", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ group_name: groupName }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error fetching artifact name:", errorData.error || errorData.message);
        return;
      }

      interface ApiResponse {
        name: string;
      }

      const data: ApiResponse | ApiResponse[] = await response.json();
      const formattedData: DropdownOption[] = Array.isArray(data)
        ? data.map((item, index) => ({ id: String(index + 1), name: item.name }))
        : [{ id: "1", name: (data as ApiResponse).name }];

      setDropdownOptions(formattedData);
      // setSelectedOption(formattedData[0].id);
      // onChange("DropDownField", formattedData[0].name);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  useEffect(() => {
    fetchArtifactName("GIT");
  }, []);

  useEffect(() => {
    setTouchedFields({});
    setUploadedFileName({});
  }, [onReset]);

  return (
    <div className="space-y-4">
      {fields.map((field) => (
        <div key={field} className="relative">
          {field === "Upload Zip" ? (
            <div>
              <input
                type="file"
                accept=".zip"
                className="p-2 border rounded text-sm w-full border-gray-300"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleFileChange(field, e.target.files?.[0] || null)
                }
              />
              {uploadedFileName[field] && (
                <p className="text-gray-700 text-sm mt-1">
                  Uploaded: {uploadedFileName[field]}
                </p>
              )}
            </div>
          ) : (
            <input
              type="text"
              placeholder={field}
              value={formData[field] || ""}
              className={`p-2 border rounded text-sm w-full ${
                touchedFields[field] && formErrors[field]
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                onChange(field, e.target.value)
              }
              onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
                handleBlur(field, e.target.value)
              }
            />
          )}
          {touchedFields[field] && formErrors[field] && (
            <p className="text-red-500 text-xs mt-1">{formErrors[field]}</p>
          )}
        </div>
      ))}

      {dropdownOptions.length > 0 && (
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full p-2 text-left border rounded text-sm bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {dropdownOptions.find((opt) => opt.id === selectedOption)?.name ||
              "Select Artifact Name"}
          </button>
          <ArrowDropDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          {isDropdownOpen && (
            <div className="absolute z-10 w-full mt-1 bg-white border rounded shadow-xl">
              <ul className="space-y-2 py-2">
                {dropdownOptions.map((option) => (
                  <li
                    key={option.id}
                    onClick={() => handleOptionSelect(option)}
                    className={`flex items-center gap-2 px-4 py-2 rounded cursor-pointer transition-all text-sm ${
                      selectedOption === option.id
                        ? "bg-indigo-50 text-indigo-700 font-medium"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <CheckCircle
                      className={`w-4 h-4 ${
                        selectedOption === option.id
                          ? "text-indigo-700"
                          : "text-gray-300"
                      }`}
                    />
                    <span>{option.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RenderFields;