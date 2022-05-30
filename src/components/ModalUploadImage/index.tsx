import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { Modal, Pressable, StyleSheet, Text } from "react-native";
import { View } from "react-native-animatable";
import Constants from "expo-constants";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import i18n from "../../translations/i18n";

import theme from "../../../styles";
import Form from "../Form";
import { isLessThanTheKB, isLinkImage, maxImageFileKB } from "../../../utils";
import { ScrollView } from "react-native-gesture-handler";
import FieldLoader from "../Form/FieldLoader";
import Logo from "../Logo";
import { NotificationType } from "../../../types";
import { NotificationComponent } from "..";

type ModalUploadImageProps = {
  visible: boolean;
  value: string;
  onClose: () => void;
  onSelectImage: (image: string) => void;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingLeft: 30,
    paddingRight: 30,
  },
  header: {
    flex: 1,
  },
  headerIcon: {
    flex: 1,
    position: "absolute",
    right: 0,
    top: Constants.statusBarHeight,
  },
  imageContainer: {
    flex: 1,
    justifyContent: "space-around",
  },
  imageContainerImage: {
    width: 64 * 2,
    height: 64 * 2,
    alignSelf: "center",
  },
  imageContainerText: {
    fontSize: 20,
    color: theme.primary,
  },
  uploadContainer: {
    backgroundColor: theme.tertiary,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 3,
    marginTop: 5,
  },
});

const ModalUploadImage = (props: ModalUploadImageProps) => {
  const { visible, value, onSelectImage, onClose } = props;

  const [imageSrc, setImageSrc] = useState<string>(value);
  const [imageSrcDef, setImageSrcDef] = useState<string>(value);
  const [showWarning, setShowWarning] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [notification, setNotification] = useState<NotificationType | null>(
    null
  );

  const handleUpload = () => {
    ImagePicker.requestMediaLibraryPermissionsAsync().then(
      (permissionResult) => {
        if (permissionResult.granted === false) {
          alert(i18n.t("modaluploadimageaccesserror"));
          return;
        }
        ImagePicker.launchImageLibraryAsync().then((pickerResult) => {
          if (pickerResult.cancelled === false) {
            setLoading(true);
            FileSystem.getInfoAsync(pickerResult.uri)
              .then((fileInfo) => {
                // if (
                //   fileInfo.size &&
                //   isLessThanTheKB(fileInfo.size, maxImageFileKB)
                // ) {
                setImageSrc(pickerResult.uri);
                // } else {
                //   setNotification({
                //     type: "error",
                //     content: `Le logo doit faire maximum une taille de ${maxImageFileKB} ko`,
                //     delay: "3",
                //   });
                // }
              })
              .finally(() => setLoading(false));
          }
        });
      }
    );
  };

  useEffect(() => {
    if (isLinkImage(imageSrc) || imageSrc.startsWith("file:///")) {
      setShowWarning(false);
      setImageSrcDef(imageSrc);
    } else {
      if (imageSrc !== "") {
        setShowWarning(true);
      }
      setImageSrcDef(value);
    }
  }, [imageSrc]);

  return (
    <Modal visible={visible} animationType="fade" transparent>
      {notification && (
        <NotificationComponent
          notification={notification}
          onHided={() => setNotification(null)}
        />
      )}
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={onClose} style={styles.headerIcon}>
            <Feather name="x" size={24} color={theme.primary} />
          </Pressable>
        </View>

        <ScrollView
          contentContainerStyle={{
            flexGrow: 2,
            justifyContent: "space-around",
          }}
        >
          <View>
            <Text style={styles.imageContainerText}>Image: </Text>
            <Logo style={styles.imageContainerImage} uri={imageSrcDef} />
            {loading && <FieldLoader />}
          </View>
          <View>
            <Text style={styles.imageContainerText}>Importer une image: </Text>
            <Pressable style={styles.uploadContainer} onPress={handleUpload}>
              <Feather name="download" color="white" size={24} />
            </Pressable>
          </View>
          <View>
            <Form.Field
              label="Source"
              required
              value={imageSrc}
              onChangeText={(text) => setImageSrc(text.trim())}
              preset={showWarning ? "warning" : "default"}
              warning={i18n.t("modaluploadimagelinkwarning")}
            />
          </View>
        </ScrollView>
      </View>
      <Form.Submit
        onSubmit={() => onSelectImage(imageSrcDef)}
        content={i18n.t("modaluploadimageconfirm")}
      />
    </Modal>
  );
};

export default ModalUploadImage;
