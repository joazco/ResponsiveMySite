import { StyleSheet } from "react-native";
import theme from "../../../styles";

const styles = StyleSheet.create({
  field: {
    marginBottom: 30,
  },
  fieldIcon: {
    marginRight: 10,
  },
  fieldContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  fieldInputContainer: {
    flex: 1,
  },
  fieldTextWarning: {
    color: theme.warning,
  },
  input: {
    height: 30,
    borderBottomWidth: 1,
    borderTopWidth: 0,
  },
  label: {
    color: theme.secondaryShade,
    fontSize: 13,
  },
  labelTextRequired: {
    color: theme.danger,
  },
  inputColor: {
    backgroundColor: theme.primary,
    borderRadius: 10,
    padding: 20,
    marginTop: 10,
    flexDirection: "row",
    borderColor: "black",
  },
  inputColorText: {
    color: "black",
    fontWeight: "bold",
  },
  section: {
    borderBottomColor: theme.light,
    borderBottomWidth: 1,
    paddingTop: 20,
  },
  sectionTextContent: {
    marginBottom: 10,
  },
  sectionText: {
    fontSize: 24,
  },
  inputNumber: {
    marginRight: 10,
    flex: 1,
  },
  inputNumberUnit: {
    // flex: 7,
    color: theme.primaryTint,
  },
  textArea: {
    marginTop: 10,
    height: 100,
    textAlignVertical: "top",
  },
  textAreaMaxLenght: {
    flex: 1,
    alignSelf: "flex-end",
    fontSize: 10,
    marginRight: 5,
    fontStyle: "italic",
    color: theme.primary,
  },
  inputImageContainer: {
    paddingLeft: 10,
    marginTop: 10,
    flexDirection: "row",
  },
  inputImageIcon: {},
});

export default styles;
