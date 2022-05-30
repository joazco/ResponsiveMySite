import React from "react";
import { Text } from "react-native";
import InputColor from "./InputColor";
import InputImage from "./InputImage";
import InputNumber from "./InputNumber";
import InputText from "./InputText";
import SwitchSelect from "./SwitchSelect";
import TextArea from "./TextArea";
import { InputProps } from "./types";

const Input = (props: InputProps) => {
  const { type = "text", showOnly, value, ...rest } = props;

  if (showOnly) {
    return <Text>{value}</Text>;
  }

  switch (type) {
    case "switch":
      return <SwitchSelect value={value} {...rest} />;
    case "color":
      return <InputColor value={value} {...rest} />;
    case "number":
      return <InputNumber value={value} {...rest} />;
    case "textarea":
      return <TextArea value={value} {...rest} />;
    case "image":
      return <InputImage value={value} {...rest} />;
    case "email":
    case "text":
    default:
      return <InputText value={value} type={type} {...rest} />;
  }
};

export default Input;
