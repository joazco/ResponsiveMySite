import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { View } from "react-native-animatable";
import * as Animatable from "react-native-animatable";

import theme from "../../../styles";

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: theme.primary,
    paddingBottom: 20,
    paddingTop: 20,
    paddingEnd: 60,
    paddingStart: 60,
    shadowColor: theme.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: "center",
  },
  buttonText: {
    color: theme.light,
  },
});

type ButtonProps = {
  content: string;
  onPress: () => void;
};

const Button = (props: ButtonProps) => {
  const { content, onPress } = props;
  return (
    <Animatable.View animation="bounceIn" duration={1500}>
      <Pressable onPress={onPress}>
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>{content}</Text>
        </View>
      </Pressable>
    </Animatable.View>
  );
};

export default Button;
