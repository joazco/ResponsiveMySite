import React, { useContext, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { BlurView } from "expo-blur";

import AppContext from "../../../AppContext";
import { AppIcon } from "../../components";
import { useDatabase, useFirebase } from "../../hooks";
import { WebAppFirebase } from "../../../types";
import FormPage from "../FormPage";
import ModalWebApp from "./ModalWebApp";
import ModalSendOffer from "./ModalSendOffer";

const styles = StyleSheet.create({
  container: {
    padding: 30,
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  scrollView: {
    // paddingTop: 30,
    // paddingStart: 30,
    // padding: 30,
    // marginBottom: 30,
    // flexDirection: "row",
    flex: 1,
  },
  text: {
    fontSize: 42,
  },
});

const Home = () => {
  const { setItem } = useDatabase();
  const { removeApp } = useFirebase();
  const { apps, codes, uid, setCodes, setCurrentApp } = useContext(AppContext);
  const [appSelected, setAppSelected] = useState<WebAppFirebase | null>(null);
  const [openEdit, setOpenEdit] = useState<WebAppFirebase | null>(null);
  const [openSendOffer, setOpenSendOffer] = useState<WebAppFirebase | null>(
    null
  );

  return (
    <React.Fragment>
      <ScrollView>
        <SafeAreaView style={styles.container}>
          {apps.map((app) => (
            <React.Fragment key={app.code}>
              <AppIcon
                webApp={app}
                onPressApp={(app) => setCurrentApp(app)}
                onLongPress={(app) => {
                  setAppSelected(app);
                }}
              />
            </React.Fragment>
          ))}
        </SafeAreaView>
      </ScrollView>
      {appSelected !== null && (
        <BlurView
          style={{ ...StyleSheet.absoluteFill }}
          tint="dark"
          intensity={100}
        />
      )}
      <FormPage
        defaultValue={openEdit}
        visible={openEdit !== null}
        onClose={() => {
          setCodes(Array.from(codes));
          setOpenEdit(null);
        }}
        onRequestClose={() => {
          setOpenEdit(null);
        }}
      />
      <ModalSendOffer
        visible={openSendOffer !== null}
        app={openSendOffer}
        onRequestClose={() => setOpenSendOffer(null)}
      />
      <ModalWebApp
        visible={appSelected !== null}
        onRequestClose={() => setAppSelected(null)}
        onDismiss={() => setAppSelected(null)}
        onRemove={(app) => {
          setAppSelected(null);
          const newCodes = Array.from(
            codes.filter((code) => code !== app.code)
          );
          setItem("apps", newCodes).then(() => setCodes(newCodes));
          if (app.uid === uid) {
            removeApp(app.id);
          }
        }}
        onEdit={(app) => {
          setAppSelected(null);
          setOpenEdit(app);
        }}
        onOpenOffer={(app) => {
          setAppSelected(null);
          setOpenSendOffer(app);
        }}
        app={appSelected}
        canEdit={appSelected?.uid === uid}
      />
    </React.Fragment>
  );
};

export default Home;
