import React from "react";
import { SafeAreaView, ScrollView } from "react-native";
import Field from "./Field";
import Input from "./Input";
import InputImage from "./InputImage";
import Label from "./Label";
import Section from "./Section";
import Submit from "./Submit";
import SwitchSelect from "./SwitchSelect";

const Form = ({ children, ...rest }: any) => {
  return (
    <SafeAreaView {...rest}>
      <ScrollView>{children}</ScrollView>
    </SafeAreaView>
  );
};

Form.Field = Field;
Form.Label = Label;
Form.Input = Input;
Form.Submit = Submit;
Form.Section = Section;
Form.SwitchSelect = SwitchSelect;
Form.InputImage = InputImage;

export default Form;
