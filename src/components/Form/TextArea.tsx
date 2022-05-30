import React, { useEffect, useState } from "react";
import { Text, TextInput } from "react-native";
import theme from "../../../styles";
import styles from "./styles";
import { InputProps } from "./types";

const TextArea = (props: InputProps) => {
  const { value = "", preset = "default", maxLength = 150, ...rest } = props;
  const [focus, setFocus] = useState<boolean>(false);

  return (
    <React.Fragment>
      <TextInput
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        style={[
          styles.input,
          styles.textArea,
          // { outline: "none" },
          preset === "warning" && {
            color: theme.warning,
            borderBottomColor: theme.warning,
          },
          preset === "default" && {
            borderBottomColor: focus ? theme.tertiary : theme.secondary,
            color: "black",
          },
        ]}
        numberOfLines={4}
        multiline
        value={value}
        maxLength={maxLength}
        {...rest}
      />
      <Text style={styles.textAreaMaxLenght}>
        {value.length}/{maxLength}
      </Text>
    </React.Fragment>
  );
};

export default TextArea;
