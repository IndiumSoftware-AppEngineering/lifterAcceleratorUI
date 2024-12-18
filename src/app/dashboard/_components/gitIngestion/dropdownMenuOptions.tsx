/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useRef, useEffect } from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { DROPDOWN_OPTIONS } from "../../_constants/constants";
import { RenderFields } from "./renderFields";
import { Button } from "@/components/ui/button";
import { dropDownMenuProps } from "../../_constants/type";
import { validateField,validateForm } from "./validationUtils";

export function DropdownMenuOptions({
  selectedOption,
  onOptionSelect,
}: dropDownMenuProps) {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const dropdownRef = useRef<HTMLDivElement>(null);

  const getSelectedOptionLabel = () =>
    DROPDOWN_OPTIONS.find((option) => option.id === selectedOption)?.label ||
    "Choose an Option";

  const handleFieldChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    setFormErrors((prevErrors) => validateField(field, value, prevErrors));
  };

  const handleFieldBlur = (field: string, value: string) => {
    setFormErrors((prevErrors) => validateField(field, value, prevErrors));
  };

  const handleSubmit = () => {
    const selectedFields =
      DROPDOWN_OPTIONS.find((option) => option.id === selectedOption)?.fields ||
      [];

    const newErrors = validateForm(selectedFields, formData);

    setFormErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Form submitted successfully", formData);
    }
  };

  const isFormValid = () => {
    const selectedFields =
      DROPDOWN_OPTIONS.find((option) => option.id === selectedOption)?.fields ||
      [];

    return selectedFields.every((field) =>
      field === "Upload Zip" ? true : formData[field]?.trim()
    );
  };

  useEffect(() => {
    setFormData({});
    setFormErrors({});

    const selectedOptionFields =
      DROPDOWN_OPTIONS.find((option) => option.id === selectedOption)?.fields ||
      [];

    const newFormData: Record<string, string> = {};
    selectedOptionFields.forEach((field) => {
      newFormData[field] = "";
    });

    setFormData(newFormData);
    setFormErrors({});
  }, [selectedOption]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="mt-2">
      <div className="flex flex-col gap-2" ref={dropdownRef}>
        <div
          className="relative"
          onClick={() => setDropdownVisible(!dropdownVisible)}
        >
          <input
            type="text"
            value={getSelectedOptionLabel()}
            readOnly
            className="p-2 border rounded text-sm w-full bg-white-100 cursor-pointer flex items-center justify-between"
          />
          <ArrowDropDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          {dropdownVisible && (
            <div className="absolute z-10 w-full mt-1 bg-white border rounded shadow-sm">
              <ul className="space-y-2 py-2">
                {DROPDOWN_OPTIONS.map((option) => (
                  <li
                    key={option.id}
                    onClick={() => onOptionSelect(option.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded cursor-pointer transition-all text-sm ${
                      selectedOption === option.id
                        ? "bg-indigo-50 text-indigo-700 font-medium"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <CheckCircleOutlineIcon
                      className={`w-4 h-4 ${
                        selectedOption === option.id
                          ? "text-[#172B9E]"
                          : "text-gray-300"
                      }`}
                    />
                    <span>{option.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        {selectedOption && (
          <>
            <RenderFields
              key={selectedOption}
              fields={
                DROPDOWN_OPTIONS.find((option) => option.id === selectedOption)
                  ?.fields || []
              }
              formErrors={formErrors}
              onChange={handleFieldChange}
              onBlur={handleFieldBlur}
            />
            <div className="flex justify-center mt-4">
              <Button
                variant="default"
                className="mt-2 font-bold"
                backgroundColor="#172B9E"
                color="#FFFFFF"
                width="114px"
                onClick={handleSubmit}
                disabled={!isFormValid()}
              >
                Get Repo
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}