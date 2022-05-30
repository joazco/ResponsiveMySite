import React, { useState } from "react";
import { Text, TextInput } from "react-native";
import { View } from "react-native-animatable";
import theme from "../../../styles";
import styles from "./styles";
import { InputProps } from "./types";

const InputText = (props: InputProps) => {
  const { value, preset = "default", maxLength, ...rest } = props;
  const [focus, setFocus] = useState<boolean>(false);
  return (
    <View>
      <TextInput
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        style={[
          styles.input,
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
        value={value}
        {...rest}
        maxLength={maxLength}
      />
      {maxLength && (
        <View style={styles.textAreaMaxLenght}>
          <Text style={styles.textAreaMaxLenght}>
            {value?.length}/{maxLength}
          </Text>
        </View>
      )}
    </View>
  );
};

export default InputText;
