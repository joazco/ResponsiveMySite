import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";
import theme from "../../../styles";
import styles from "./styles";
import { InputProps } from "./types";

const InputNumber = (props: InputProps) => {
  const {
    value,
    preset = "default",
    unit,
    maxLength,
    onChangeText,
    ...rest
  } = props;
  const [focus, setFocus] = useState<boolean>(false);
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "flex-end",
      }}
    >
      <View style={{ flex: 1 }}>
        <TextInput
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          style={[
            styles.input,
            styles.inputNumber,
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
          keyboardType="number-pad"
          onChangeText={(text) => {
            if (
              (maxLength && Number(text) <= maxLength && onChangeText) ||
              (!maxLength && onChangeText)
            ) {
              onChangeText(text);
            }
          }}
          {...rest}
        />
        {maxLength && (
          <View style={styles.textAreaMaxLenght}>
            <Text style={styles.textAreaMaxLenght}>
              Valeur maximum est de {maxLength}
            </Text>
          </View>
        )}
      </View>
      {unit && <Text style={styles.inputNumberUnit}>{unit}</Text>}
    </View>
  );
};

export default InputNumber;
