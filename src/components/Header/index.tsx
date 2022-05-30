import React from "react";
import { View, Image, Text, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";

import { logoJoazco } from "../../../assets/images";
import styles from "./styles";

type HeaderProps = {
  text: string;
  isModal?: boolean;
  icon?: {
    name: string;
    onClick: () => void;
  };
  onClose?: () => void;
};

const Header = (props: HeaderProps) => {
  const { text, isModal, icon, onClose } = props;
  return (
    <View
      style={[
        styles.headerContainer,
        isModal && { paddingBottom: 17, paddingTop: 17 },
      ]}
    >
      <View style={styles.headerLeft}>
        {!isModal && <Image style={styles.headerLogo} source={logoJoazco} />}
        <Text style={styles.headerText}>{text}</Text>
      </View>
      {isModal && (
        <Pressable
          style={styles.headerRight}
          onPress={() => onClose && onClose()}
        >
          <Feather style={styles.headerRightIcon} name="x" />
        </Pressable>
      )}
      {icon && (
        <Pressable style={styles.headerRight} onPress={icon.onClick}>
          <Feather style={styles.headerRightIcon} name={icon.name as any} />
        </Pressable>
      )}
    </View>
  );
};

export default Header;
