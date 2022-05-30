import React, { useCallback, useContext, useMemo } from "react";
import { Modal, View } from "react-native";
import Constants from "expo-constants";

import AppContext from "../../../AppContext";

import { Header } from "../../components";
import { useDatabase, useFirebase, useRest } from "../../hooks";
import theme from "../../../styles";
import { WebAppFirebase } from "../../../types";
import CreateForm from "./CreateForm";
import i18n from "../../translations/i18n";

type FormPageProps = {
  visible: boolean;
  defaultValue?: WebAppFirebase | null;
  onRequestClose: () => void;
  onClose: () => void;
};

const FormPage = (props: FormPageProps) => {
  const { visible, defaultValue, onRequestClose, onClose } = props;
  const { setItem } = useDatabase();
  const { codes, uid, setCodes, setShowSplashScreen } = useContext(AppContext);
  const { addWebApp, updateWebApp, uploadFile } = useFirebase();
  const { fetchSaveCode } = useRest();

  const isEdit = useMemo(
    () => typeof defaultValue !== "undefined" && defaultValue !== null,
    [defaultValue]
  );

  const hideSubmit = useCallback(() => {
    setTimeout(() => {
      onClose();
      setShowSplashScreen(null);
    }, 1000);
  }, [setShowSplashScreen]);

  const onSubmit = useCallback(
    (webApp: WebAppFirebase) => {
      setShowSplashScreen({
        backgroundColor: theme.white,
        delay: "100",
        spinner: null,
        text: !isEdit
          ? i18n.t("screenmessagecreateapp").replace("{name}", webApp.name)
          : i18n.t("screenmessagemodifyapp").replace("{name}", webApp.name),
        icon: webApp.icon,
      });
      if (!isEdit) {
        uploadFile({ ...webApp, uid: uid || "" }).then((appWithIcon) => {
          addWebApp(appWithIcon).then((app) => {
            fetchSaveCode(app.id).then((response) => {
              if (response.error) return;
              const { code } = response;
              const newCodes = Array.from(codes.concat(code));
              setItem<number[]>("apps", newCodes)
                .then(() => setCodes(newCodes))
                .finally(hideSubmit);
            });
          });
        });
      } else {
        updateWebApp(webApp).finally(hideSubmit);
      }
    },
    [uid, codes, defaultValue, setItem]
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onRequestClose}
      presentationStyle="overFullScreen"
      transparent={false}
      statusBarTranslucent={true}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: theme.primary,
          paddingTop: Constants.statusBarHeight + 10,
        }}
      >
        <Header
          text={
            isEdit
              ? i18n.t("modaltitleformedit")
              : i18n.t("modaltitleformcreate")
          }
          isModal
          onClose={onRequestClose}
        />
        <CreateForm
          onSubmit={onSubmit}
          isEdit={isEdit}
          defaultValue={defaultValue || undefined}
        />
      </View>
    </Modal>
  );
};

export default FormPage;
