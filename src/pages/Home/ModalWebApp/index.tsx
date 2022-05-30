import React, { useContext } from "react";
import {
  Image,
  Modal,
  ModalProps,
  Pressable,
  StyleSheet,
  Text,
  Alert,
  Platform,
} from "react-native";
import Constants from "expo-constants";
import { View } from "react-native-animatable";
import { WebAppFirebase } from "../../../../types";
import { Feather, Entypo } from "@expo/vector-icons";
import theme from "../../../../styles";
import { ScrollView } from "react-native-gesture-handler";
import { defaultApps } from "../../../../utils";
import AppContext from "../../../../AppContext";
import { Logo } from "../../../components";
import i18n from "../../../translations/i18n";

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
  },
  textInfo: {
    marginBottom: 5,
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    paddingTop: 5,
    paddingRight: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    flex: 1,
    marginTop: Constants.statusBarHeight + 100 * 2,
  },
  rowCloseIcon: {
    alignItems: "flex-end",
  },
  rowContent: {
    flex: 1,
  },
  rowImage: {
    alignItems: "center",
  },
  rowActions: {
    paddingLeft: 20,
    flex: 1,
    justifyContent: "flex-end",
  },
  rowAction: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
  },
  actionText: {
    fontSize: 32,
    marginLeft: 10,
    color: theme.primary,
  },
});

type ModalWebAppProps = {
  app: WebAppFirebase | null;
  canEdit: boolean;
  onEdit: (app: WebAppFirebase) => void;
  onOpenOffer: (app: WebAppFirebase) => void;
  onRemove: (app: WebAppFirebase) => void;
} & ModalProps;

const ModalWebApp = (props: ModalWebAppProps) => {
  const {
    app,
    visible,
    canEdit,
    onRequestClose,
    onOpenOffer,
    onRemove,
    onEdit,
    ...rest
  } = props;
  const { codesOfferSended } = useContext(AppContext);

  if (!app || !visible) return <React.Fragment />;
  const handleRemove = () => {
    Alert.alert(
      i18n.t("modalwebappalertdeletetitle"),
      i18n.t("modalwebappalertdeletemessage").replace("${name}", app.name),
      [
        {
          text: i18n.t("btncancel"),
          style: "cancel",
        },
        {
          text: i18n.t("btnconfirm"),
          onPress: () => onRemove(app),
        },
      ]
    );
  };
  return (
    <Modal
      animationType="slide"
      transparent
      onRequestClose={onRequestClose}
      visible
      {...rest}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.rowCloseIcon}>
            <Pressable onPress={onRequestClose}>
              <Feather size={24} name="x" color={theme.primary} />
            </Pressable>
          </View>
          <View style={styles.rowContent}>
            <View style={styles.rowImage}>
              <Logo uri={app.icon} width={32} height={32} />
              <Text style={styles.textInfo}>{app.name}</Text>
              <Text style={styles.textInfo}>{app.url}</Text>
              <Text>
                {i18n.t("modalwebappcodetitle")} {app.code}
              </Text>
            </View>
          </View>
          {!defaultApps.includes(app.code) && (
            <ScrollView style={{ flex: 1 }}>
              <View style={styles.rowActions}>
                {canEdit && (
                  <Pressable
                    style={styles.rowAction}
                    onPress={() => onEdit(app)}
                  >
                    <Feather size={24} name="edit-3" color={theme.primary} />
                    <Text style={styles.actionText}>
                      {i18n.t("modalwebappcodeedit")}
                    </Text>
                  </Pressable>
                )}
                {!codesOfferSended.includes(app.code) && Platform.OS !== "ios" && (
                  <Pressable
                    style={styles.rowAction}
                    onPress={() => onOpenOffer(app)}
                  >
                    {/* {Platform.OS !== "ios" ? (
                      <Entypo
                        name="google-play"
                        size={24}
                        color={theme.tertiary}
                      />
                    ) : (
                      <Entypo
                        name="app-store"
                        size={24}
                        color={theme.tertiary}
                      />
                    )} */}
                    <Entypo
                      name="google-play"
                      size={24}
                      color={theme.tertiary}
                    />
                    <Text
                      style={[styles.actionText, { color: theme.tertiary }]}
                    >
                      {i18n.t("modalwebappsendstore")}
                    </Text>
                  </Pressable>
                )}

                <Pressable onPress={handleRemove} style={styles.rowAction}>
                  <Feather size={24} name="trash" color={theme.danger} />
                  <Text style={[styles.actionText, { color: theme.danger }]}>
                    {i18n.t("modalwebappdelete")}
                  </Text>
                </Pressable>
              </View>
            </ScrollView>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default ModalWebApp;
