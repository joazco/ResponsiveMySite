import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import Logo from "../Logo";
import theme from "../../../styles";
import { WebAppFirebase } from "../../../types";

type AppIconProps = {
  webApp: WebAppFirebase;
  onPressApp: (app: WebAppFirebase) => void;
  onLongPress: (app: WebAppFirebase) => void;
};

const styles = StyleSheet.create({
  appIconContainer: {
    alignItems: "center",
    margin: 5,
  },
  appIconImageContainer: {
    padding: 15,
    borderRadius: 50,
    borderColor: theme.light,
    borderWidth: 1,
    margin: 5,
  },
  appIconImage: {
    width: 50,
    height: 50,
  },
});

const AppIcon = ({ webApp, onPressApp, onLongPress }: AppIconProps) => {
  return (
    <Pressable
      style={styles.appIconContainer}
      onPress={() => onPressApp(webApp)}
      onLongPress={() => onLongPress(webApp)}
    >
      <View style={styles.appIconImageContainer}>
        <Logo style={styles.appIconImage} uri={webApp.icon} />
      </View>
      <View>
        <Text>{webApp.name}</Text>
      </View>
    </Pressable>
  );
};

export default AppIcon;
