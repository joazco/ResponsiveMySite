import { StyleSheet } from "react-native";
import theme from "../../../styles";

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    bottom: 30,
    backgroundColor: theme.primary,
    borderRadius: 50,
  },
});

export default styles;
