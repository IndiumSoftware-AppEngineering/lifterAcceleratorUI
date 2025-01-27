"use client"
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
import { config } from "process";
import { useAppContext } from "@/context";
import { Toaster } from "@/components/ui/toaster";
export function DropdownMenuOptions({
  selectedOption,
  onOptionSelect,
  onCancel,
  onDropdownReset
}: dropDownMenuProps) {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const {projectId} = useAppContext();
  const { toast } = useToast()
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
          name: formData["Artifact Name"],
          artifact_type: "Github",
          artifact_config: configPayload,
          artifact_type_id: 1,
          org_id: 1,
          project_id: projectId ,
          status:"SUBMITTED",
          created_by: "admin@example.com",
          created_on: "2025-01-01T10:00:00Z",
          modified_by: "user@example.com",
          modified_on: "2025-01-02T12:00:00Z",
        }
        const response = await fetch("/api/configure-artifact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          const errorData = await response.json(); // Ensure the response body is parsed correctly
          throw new Error(errorData.message || `API error: ${response.status}`);
        }

        const data = await response.json();
        console.log("API response:", data);
        setLoading(false);
        onDropdownReset();
        toast({
          title: "Git Ingestion configured",
          variant: "default",
          description:`Git Ingestion configured for ${formData["Artifact Name"]}` ,
          action: <ToastAction altText="Okay">Okay</ToastAction>,
        })
      } catch (error: unknown) {
        onDropdownReset();
        let errorMessage = "An unknown error occurred";
        if (error instanceof Error) {
            errorMessage = error.message;
            console.error(error.message);
        } else {
            console.error(errorMessage);
        }
        toast({
            variant: "destructive",
            title: "Configuration failed",
            description: errorMessage,
            action: <ToastAction altText="Try again">Try Again</ToastAction>,
        });
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
                    className={`flex items-center gap-2 px-4 py-2 rounded cursor-pointer transition-all text-sm ${selectedOption === option.id
                        ? "bg-indigo-50 text-indigo-700 font-medium"
                        : "hover:bg-gray-100"
                      }`}
                  >
                    <CheckCircleOutlineIcon
                      className={`w-4 h-4 ${selectedOption === option.id
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
        {/* <input
              type="text"
              placeholder="Artifact Name"
              className={`p-2 border rounded text-sm w-full ${
                formErrors["Artifact Name"]
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              onChange={(e) => onNameChange(e.target.value)}
        /> */}
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