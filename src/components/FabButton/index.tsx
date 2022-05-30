import React, { useMemo } from "react";
import { Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import theme from "../../../styles";
import styles from "./styles";

type FabButtonProps = {
  position?: "left" | "right";
  icon?: "plus" | "code";
  onPress: () => void;
};

const FabButton = (props: FabButtonProps) => {
  const { position = "right", icon = "plus", onPress } = props;
  const finalIcon = useMemo(() => {
    switch (icon) {
      case "code":
        return "align-justify";
      default:
      case "plus":
        return "plus";
    }
  }, [icon]);
  return (
    <Pressable
      style={[
        styles.button,
        position === "left" ? { left: 15 } : { right: 15 },
      ]}
      onPress={onPress}
    >
      <Feather name={finalIcon} size={24} color={theme.white} />
    </Pressable>
  );
};

export default FabButton;
