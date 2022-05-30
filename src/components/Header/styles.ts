import { StyleSheet } from "react-native";

import theme from "../../../styles";

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: theme.primary,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: "row",
    display: "flex",
    alignItems: "center",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  headerLogo: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 24,
    color: theme.white,
  },
  headerRight: {},
  headerRightIcon: {
    fontSize: 24,
    color: theme.white,
  },
});

export default styles;
