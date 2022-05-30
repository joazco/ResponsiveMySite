import React, { useCallback } from "react";
import SwitchSelector from "react-native-switch-selector";
import theme from "../../../styles";
import i18n from "../../translations/i18n";
import { InputProps } from "./types";

const defaultOptions = [
  {
    label: i18n.t("optionyes"),
    value: "yes",
    accessibilityLabel: "switch-one",
  },
  {
    label: i18n.t("optionno"),
    value: "no",
    accessibilityLabel: "switch-one",
  },
];

const SwitchSelect = (props: InputProps) => {
  const { options = defaultOptions, value, onChangeText } = props;
  const findInitial = useCallback(() => {
    let initial = 0;
    options.forEach((option, index) => {
      if (option.value === value) {
        initial = index;
      }
    });
    return initial;
  }, [value]);
  return (
    <SwitchSelector
      options={options}
      initial={findInitial()}
      onPress={(value) => onChangeText && onChangeText(value as string)}
      style={{ marginTop: 10 }}
      buttonColor={theme.tertiary}
    />
  );
};

export default SwitchSelect;
