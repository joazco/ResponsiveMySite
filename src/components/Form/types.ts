import { TextInputProps } from "react-native";
import { ISwitchSelectorProps } from "react-native-switch-selector";

export type InputSelect = Partial<Pick<ISwitchSelectorProps, "options">>;
export type InputProps = {
  value?: string | null;
  preset?: "default" | "warning";
  type?:
    | "text"
    | "email"
    | "color"
    | "image"
    | "switch"
    | "number"
    | "textarea"
    | "image";
  showOnly?: boolean;
  unit?: string;
} & TextInputProps &
  InputSelect;
export type LabelProps = {
  text: string;
  required?: boolean;
  preset?: "default" | "warning";
};
export type FieldProps = {
  label?: string;
  icon?: any;
  loading?: boolean;
  warning?: string;
} & Pick<LabelProps, "required"> &
  Omit<InputProps, "">;
