import React, { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, Image, StyleSheet, Text } from "react-native";
import * as Animatable from "react-native-animatable";
import { iconSplashScreen } from "../../../assets/images";
import theme from "../../../styles";
import { SplashScreenType } from "../../../types";
import { lightOrDark } from "../../../utils";

const styles = StyleSheet.create({
  splashScreenContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  splashScreenContainerImage: {
    width: 64 * 2,
    height: 64 * 2,
  },
  splashScreenContainerText: {
    marginTop: 5,
    marginBottom: 5,
    color: "black",
  },
});

type SplashScreenProps = {
  icon?: string;
  text?: string;
  splashScreen: SplashScreenType;
  onClose: () => void;
};

const SplashScreen = (props: SplashScreenProps) => {
  const [animation, setAnimation] = useState<"fadeOut">();
  const {
    icon,
    text = "",
    splashScreen: {
      delay,
      backgroundColor,
      spinner,
      text: textSplashScreen,
      icon: iconSplashScreenVar,
    },
    onClose,
  } = props;

  const delayNumber = useMemo(() => Number(delay) * 1000, [delay]);
  const finalIcon = useMemo(() => {
    if (iconSplashScreenVar) {
      return { uri: iconSplashScreenVar };
    }
    if (icon) {
      return { uri: icon };
    }
    return iconSplashScreen;
  }, [icon, iconSplashScreen, iconSplashScreenVar]);
  const finalBackgroundColor = useMemo(() => {
    if (!icon && !iconSplashScreenVar) {
      return theme.primary;
    }
    return backgroundColor;
  }, [icon, iconSplashScreenVar, backgroundColor]);

  useEffect(() => {
    setTimeout(() => setAnimation("fadeOut"), delayNumber - 500);
    setTimeout(onClose, delayNumber);
  }, []);

  return (
    <Animatable.View
      animation={animation}
      style={[
        styles.splashScreenContainer,
        { backgroundColor: finalBackgroundColor },
      ]}
    >
      <Image
        style={styles.splashScreenContainerImage}
        source={finalIcon}
        resizeMode="contain"
      />
      <Text
        style={[
          styles.splashScreenContainerText,
          {
            color:
              lightOrDark(finalBackgroundColor) === "dark" ? "white" : "black",
          },
        ]}
      >
        {textSplashScreen ? textSplashScreen : text}
      </Text>
      {spinner && (
        <ActivityIndicator size={spinner.size} color={spinner.color} />
      )}
    </Animatable.View>
  );
};

export default SplashScreen;
