import React from "react";
import { StyleSheet, View } from "react-native";
import Prompt from "react-native-prompt-cross";
import * as Notifications from "expo-notifications";

import i18n from "./src/translations/i18n";
import {
  FabButton,
  Header,
  NotificationComponent,
  NotificationContext,
  SplashScreen,
  StatusBarComponent,
} from "./src/components";
import { FormPage, Home, WebViewPage } from "./src/pages";
import { useApp } from "./src/hooks";
import AppContext from "./AppContext";
import { maxApp } from "./utils";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const App = () => {
  const {
    showSplashScreen,
    codes,
    apps,
    currentApp,
    statusBar,
    openForm,
    uid,
    showModalCode,
    notification,
    codesOfferSended,
    setCodes,
    setCurrentApp,
    setOpenForm,
    setShowSplashScreen,
    setShowModalCode,
    appendApp,
    setNotification,
    openModalCreateApp,
    setCodesOfferSended,
    removeAllApps,
    alertInfoIfFirstClose,
  } = useApp();
  if (showSplashScreen) {
    return (
      <View style={{ flex: 1 }}>
        <StatusBarComponent statusBar={statusBar} />
        <SplashScreen
          onClose={() => setShowSplashScreen(null)}
          splashScreen={showSplashScreen}
        />
      </View>
    );
  }

  return (
    <AppContext.Provider
      value={{
        codes,
        codesOfferSended,
        apps,
        currentApp,
        uid,
        setCodes,
        setCodesOfferSended,
        setCurrentApp,
        setShowSplashScreen,
      }}
    >
      <NotificationContext.Provider value={{ notification, setNotification }}>
        <NotificationComponent
          notification={notification}
          onHided={() => setNotification(null)}
        />
        <StatusBarComponent statusBar={statusBar} />
        <Prompt
          title={i18n.t("promptaddapptitle")}
          visible={showModalCode}
          message={i18n.t("promptaddappmessage")}
          keyboardType="number-pad"
          useNatifIosPrompt
          callbackOrButtons={[
            {
              text: i18n.t("btncancel"),
              style: "cancel",
              onPress: () => setShowModalCode(false),
            },
            {
              text: i18n.t("btnconfirm"),
              onPress: (code?: string) => {
                setShowModalCode(false);
                if (code) {
                  appendApp(Number(code));
                }
              },
            },
          ]}
        />
        <View style={styles.container}>
          {!currentApp && (
            <React.Fragment>
              <Header
                text={i18n.t("headerhome")}
                icon={
                  maxApp >= apps.length
                    ? undefined
                    : {
                        name: "trash",
                        onClick: removeAllApps,
                      }
                }
              />
              <Home />
              {!openForm && <FabButton onPress={() => openModalCreateApp()} />}
              {!openForm && (
                <FabButton
                  position="left"
                  icon="code"
                  onPress={() => openModalCreateApp("append")}
                />
              )}
              <FormPage
                visible={openForm}
                onRequestClose={() => setOpenForm(false)}
                onClose={() => setOpenForm(false)}
              />
            </React.Fragment>
          )}
          {currentApp && <WebViewPage onClose={alertInfoIfFirstClose} />}
        </View>
      </NotificationContext.Provider>
    </AppContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default App;
