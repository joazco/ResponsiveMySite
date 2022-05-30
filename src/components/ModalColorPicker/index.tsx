import React, { useEffect, useState } from "react";
import { Modal, Pressable } from "react-native";
import Constants from "expo-constants";
import { View } from "react-native-animatable";
import { Feather } from "@expo/vector-icons";
import ColorPicker from "react-native-wheel-color-picker";
import theme from "../../../styles";
import i18n from "../../translations/i18n";
import Form from "../Form";

type ModalColorPickerProps = {
  visible: boolean;
  value: string;
  onClose: () => void;
  onSelectColor: (color: string) => void;
};

const ModalColorPicker = (props: ModalColorPickerProps) => {
  const { visible, value, onSelectColor, onClose } = props;
  const [color, setColor] = useState<string>(value);
  const [textColor, setTextColor] = useState<string>(value);

  useEffect(() => {
    setTextColor(color);
  }, [color]);

  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          paddingLeft: 30,
          paddingRight: 30,
          // paddingTop: Constants.statusBarHeight,
        }}
      >
        <View
          style={{
            flex: 1,
          }}
        >
          <Pressable
            onPress={onClose}
            style={{
              flex: 1,
              position: "absolute",
              right: 0,
              top: Constants.statusBarHeight,
            }}
          >
            <Feather name="x" size={24} color={theme.primary} />
          </Pressable>
        </View>
        <View style={{ flex: 4 }}>
          <ColorPicker
            onColorChangeComplete={(value: string) => {
              setColor(value);
            }}
            color={color}
            noSnap
            row
            swatches
          />
        </View>
        <View style={{ flex: 1 }}>
          <Form.Field
            label={i18n.t("modalcolorpickerhexacode")}
            type="text"
            onChangeText={(text) => {
              if (/^#[0-9a-f]{6}$/i.test(text)) {
                setColor(text);
              } else if (text.length <= 6) {
                setTextColor(text);
              }
            }}
            required
            value={textColor}
          />
        </View>
      </View>
      <Form.Submit
        onSubmit={() => onSelectColor(color)}
        content={i18n.t("modalcolorpickerconfirm")}
      />
    </Modal>
  );
};

export default ModalColorPicker;
