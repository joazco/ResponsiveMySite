import React, { useEffect, useState } from "react";
import { StyleSheet, Text } from "react-native";
import * as Animatable from "react-native-animatable";
import Constants from "expo-constants";
import { AntDesign } from "@expo/vector-icons";

import { NotificationType } from "../../../types";
import theme from "../../../styles";

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    alignSelf: "center",
    top: Constants.statusBarHeight + 10,
    backgroundColor: "white",
    zIndex: 999,
    maxWidth: 300,
    flex: 1,
    paddingLeft: 10,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  text: {
    color: "black",
    marginLeft: 10,
  },
});

type NotificationComponentProps = {
  notification: NotificationType | null;
  onHided?: () => void;
};

const NotificationComponent = ({
  notification,
  onHided,
}: NotificationComponentProps) => {
  const [show, setShow] = useState<boolean>(false);
  const [animation, setAnimation] = useState<"slideInDown" | "slideOutUp">(
    "slideInDown"
  );

  useEffect(() => {
    if (show && notification) {
      const { delay = "4" } = notification;
      const delayMilliseconde = Number(delay) * 1000;
      setTimeout(() => setAnimation("slideOutUp"), delayMilliseconde);
      setTimeout(() => {
        setShow(false);
        if (onHided) {
          onHided();
        }
      }, delayMilliseconde + 500);
    }
  }, [show, notification]);

  useEffect(() => {
    setAnimation("slideInDown");
    setShow(notification !== null);
  }, [notification]);

  if (!show || !notification) return <React.Fragment />;

  const { type, content } = notification;

  return (
    <Animatable.View animation={animation} style={styles.container}>
      {type === "success" && (
        <AntDesign name="checkcircle" size={12} color={theme.success} />
      )}
      {type === "error" && (
        <AntDesign name="closecircle" size={12} color={theme.danger} />
      )}
      <Text style={styles.text}>{content}</Text>
    </Animatable.View>
  );
};

export default NotificationComponent;
