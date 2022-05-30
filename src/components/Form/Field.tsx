import React from "react";
import { Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";

import Input from "./Input";
import Label from "./Label";
import { FieldProps } from "./types";
import theme from "../../../styles";
import styles from "./styles";
import FieldLoader from "./FieldLoader";

const Field = (props: FieldProps) => {
  const { label, icon, required, loading, preset, warning, ...rest } = props;
  return (
    <Animatable.View animation="bounceIn" style={styles.field} duration={1500}>
      <View style={styles.fieldContainer}>
        {icon && (
          <Feather
            name={icon}
            size={24}
            color={preset === "warning" ? theme.warning : theme.primary}
            style={styles.fieldIcon}
          />
        )}

        <View style={styles.fieldInputContainer}>
          {label && <Label text={label} required={required} preset={preset} />}
          <Input preset={preset} {...rest} />
        </View>
      </View>
      {loading && <FieldLoader />}
      {warning && preset === "warning" && (
        <View>
          <Text style={styles.fieldTextWarning}>{warning}</Text>
        </View>
      )}
    </Animatable.View>
  );
};

export default Field;
