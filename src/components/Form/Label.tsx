import React from "react";
import { Text } from "react-native";
import theme from "../../../styles";
import styles from "./styles";
import { LabelProps } from "./types";

const Label = (props: LabelProps) => {
  const { text, required, preset = "default" } = props;
  return (
    <Text
      style={[
        styles.label,
        preset === "warning" && {
          color: theme.warning,
        },
      ]}
    >
      {text}{" "}
      {required && (
        <Text
          style={[
            styles.labelTextRequired,
            preset === "warning" && {
              color: theme.warning,
            },
          ]}
        >
          *
        </Text>
      )}
    </Text>
  );
};

export default Label;
