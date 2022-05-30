import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import { Image, Pressable, View } from "react-native";
import ModalUploadImage from "../ModalUploadImage";
import theme from "../../../styles";

import styles from "./styles";
import { InputProps } from "./types";
import Logo from "../Logo";

const InputImage = (props: InputProps) => {
  const { value, onChangeText } = props;
  const [openModal, setOpenModal] = useState<boolean>(false);
  return (
    <React.Fragment>
      <Pressable
        style={styles.inputImageContainer}
        onPress={() => setOpenModal(true)}
      >
        {typeof value !== "undefined" && (
          <Logo width={64} height={64} uri={value} />
        )}
        <Feather
          name="download"
          size={18}
          style={styles.inputImageIcon}
          color={theme.tertiary}
        />
      </Pressable>
      <ModalUploadImage
        visible={openModal}
        value={value || ""}
        onClose={() => setOpenModal(false)}
        onSelectImage={(imageSrc) => {
          if (onChangeText) {
            onChangeText(imageSrc);
          }
          setOpenModal(false);
        }}
      />
    </React.Fragment>
  );
};

export default InputImage;
