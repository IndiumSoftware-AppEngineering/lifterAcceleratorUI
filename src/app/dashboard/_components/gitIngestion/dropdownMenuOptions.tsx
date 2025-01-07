"use client";
import React, { useState, useRef, useEffect } from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { DROPDOWN_OPTIONS } from "../../_constants/constants";
import { RenderFields } from "./renderFields";
import { Button } from "@/components/ui/button";
import { dropDownMenuProps } from "../../_constants/type";
import { validateField, validateForm } from "./validationUtils";
import { constructPayload } from "./utils/payloadConstruct";
import { Loader } from "@/components/common/loaders/loader";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useAppContext } from "@/context";
import { Toaster } from "@/components/ui/toaster";

export function DropdownMenuOptions({
  selectedOption,
  onOptionSelect,
  onDropdownReset, // Add this prop to reset the dropdown
}: dropDownMenuProps & { onDropdownReset: () => void }) {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const { projectId } = useAppContext();
  const [dropdown, setDropdown] = useState<String[]>([]);
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

  const handleSubmit = async () => {
    const selectedOptionData = DROPDOWN_OPTIONS.find(
      (option) => option.id === selectedOption
    );

    if (!selectedOptionData) {
      toast({
        variant: "destructive",
        title: "Invalid Option",
        description: "Please select a valid option.",
      });
      return;
    }

    const { fields } = selectedOptionData;
    const newErrors = validateForm(fields, formData);
    setFormErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      try {
        const configPayload = constructPayload(selectedOption || "", formData);
        const payload = {
          name: formData["DropDownField"],
          artifact_config: configPayload,
          artifact_type_id: 1,
          org_id: 1,
          project_id: parseInt(projectId || "1"),
          created_by: "nirai@indium.com",
          created_on: "2025-01-01T10:00:00Z",
          modified_by: "user@example.com",
          modified_on: "2025-01-02T12:00:00Z",
          status: "SUBMITTED",
        };

        const response = await fetch("/api/configure-artifact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.message || `API error: ${response.status}`
          );
        }

        const data = await response.json();
        console.log("API response:", data);

        // Show toast message immediately
       toast({
          title: "Configuration Successful",
          variant: "default",
          description: `Git Ingestion for ${formData["Artifact Name"]} configured`,
          action: <ToastAction altText="Okay">Okay</ToastAction>,
        });

        // Reset form data and errors after successful API call
        setFormData({});
        setFormErrors({});

        // Reset the dropdown to its initial state
        onDropdownReset();

        setLoading(false);
      } catch (error: unknown) {
        let errorMessage = "An unknown error occurred";
        if (error instanceof Error) {
          errorMessage = error.message;
          console.error(error.message);
        } else {
          console.error(errorMessage);
        }
        toast({
          variant: "destructive",
          title: "Download failed",
          description: errorMessage,
          action: <ToastAction altText="Try again">Try Again</ToastAction>,
        });
        setLoading(false);
      }
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
      <p className="text-sm font-semibold mb-2 text-[#363636]">Choose an option</p>
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
            <div className="absolute z-10 w-full mt-1 bg-white border rounded shadow-xl">
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
              formData={formData}
              formErrors={formErrors}
              onChange={handleFieldChange}
              onBlur={handleFieldBlur}
              onReset={() => {
                setFormData({});
                setFormErrors({});
              }}
            />
            {!loading ? (
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
            ) : (
              <div className="mt-10">
                <Loader />
              </div>
            )}
          </>
        )}
      </div>
      <Toaster />
    </div>
  );
}