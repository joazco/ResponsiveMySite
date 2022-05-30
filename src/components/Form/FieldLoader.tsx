import React, { useEffect } from "react";
import { StyleSheet, View, Animated } from "react-native";

import theme from "../../../styles";

const styles = StyleSheet.create({
  loaderContainer: {
    marginTop: 7,
    flexDirection: "row",
    marginLeft: 30,
  },
  loader: {
    width: 7,
    height: 7,
    backgroundColor: theme.secondary,
    marginRight: 5,
    borderRadius: 50,
    bottom: 0,
  },
});

const FieldLoader = () => {
  const startValue = new Animated.Value(0);
  const startValue2 = new Animated.Value(0);
  const endValue = 7;
  const duration = 1000 / 3;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(startValue, {
          toValue: endValue,
          duration: duration,
          useNativeDriver: true,
        }),
        Animated.timing(startValue, {
          toValue: 0,
          duration: duration,
          useNativeDriver: true,
        }),
      ])
    ).start();
    setTimeout(() => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(startValue2, {
            toValue: endValue,
            duration: duration,
            useNativeDriver: true,
          }),
          Animated.timing(startValue2, {
            toValue: 0,
            duration: duration,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }, duration);
  }, []);

  return (
    <View style={styles.loaderContainer}>
      {[0, 1, 2, 3].map((index) => (
        <Animated.View
          key={index}
          style={[
            styles.loader,
            {
              transform: [
                { translateY: index % 2 === 0 ? startValue : startValue2 },
              ],
            },
          ]}
        />
      ))}
    </View>
  );
};
export default FieldLoader;
