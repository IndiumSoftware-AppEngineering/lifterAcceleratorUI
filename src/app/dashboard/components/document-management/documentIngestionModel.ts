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
