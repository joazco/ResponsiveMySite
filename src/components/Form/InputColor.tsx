import React, { useState } from "react";
import { Pressable } from "react-native";
import { View } from "react-native-animatable";
import { lightOrDark } from "../../../utils";

import ModalColorPicker from "../ModalColorPicker";
import styles from "./styles";
import { InputProps } from "./types";

const InputColor = (props: InputProps) => {
  const { value = "#34495e", onChangeText } = props;
  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <React.Fragment>
      <Pressable onPress={() => setOpenModal(true)}>
        <View
          style={[
            styles.inputColor,
            {
              backgroundColor: value,
              borderWidth: lightOrDark(value) === "dark" ? 0 : 1,
            },
          ]}
        />
      </Pressable>
      <ModalColorPicker
        visible={openModal}
        value={value}
        onClose={() => setOpenModal(false)}
        onSelectColor={(c) => {
          if (onChangeText) {
            onChangeText(c);
          }
          setOpenModal(false);
        }}
      />
    </React.Fragment>
  );
};

export default InputColor;
