import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import theme from "../../../styles";

const styles = StyleSheet.create({
  submitContainer: {},
  submitPressable: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    paddingBottom: 20,
    backgroundColor: theme.successShade,
  },
  submitText: {
    color: theme.white,
  },
});

type SubmitProps = {
  content: string;
  disabled?: boolean;
  style?: any;
  type?: "submit" | "cancel";
  onSubmit: () => void;
};
const Submit = (props: SubmitProps) => {
  const { content, disabled, style, type, onSubmit } = props;
  return (
    <View style={style}>
      <Pressable
        onPress={onSubmit}
        style={[
          styles.submitPressable,
          disabled && { backgroundColor: theme.lightShade },
          type === "cancel" && { backgroundColor: theme.danger },
        ]}
        disabled={disabled}
      >
        <Text style={styles.submitText}>{content}</Text>
      </Pressable>
    </View>
  );
};

export default Submit;
