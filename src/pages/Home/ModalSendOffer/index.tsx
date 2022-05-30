import React from "react";
import {
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Constants from "expo-constants";

import theme from "../../../../styles";
import { Form, Header, Logo } from "../../../components";
import { WebAppFirebase } from "../../../../types";
import useModalSendOffer from "./useModalSendOffer";
import i18n from "../../../translations/i18n";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.white,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 20,
  },
  rowAppInfo: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export type ModalSendOfferProps = {
  app: WebAppFirebase | null;
  visible: boolean;
  onRequestClose: () => void;
};

const ModalSendOffer = (props: ModalSendOfferProps) => {
  const { app, visible, onRequestClose } = props;
  const {
    email,
    phoneNumber,
    choiceContact,
    message,
    informationTest,
    setEmail,
    setPhoneNumber,
    setChoiceContact,
    setMessage,
    setInformationTest,
    formIsValid,
    onSubmit,
  } = useModalSendOffer({ app, onRequestClose });

  if (app === null) return <React.Fragment />;
  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onRequestClose}
      presentationStyle="overFullScreen"
      transparent={false}
      statusBarTranslucent={true}
    >
      <KeyboardAvoidingView
        style={{
          flex: 1,
          backgroundColor: theme.primary,
          paddingTop: Constants.statusBarHeight + 10,
        }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Form>
          <Header
            text={i18n.t("modalsendoffertitle")}
            isModal
            onClose={onRequestClose}
          />
          <View style={styles.container}>
            <View style={styles.rowAppInfo}>
              <Logo uri={app.icon} width={64} height={64} />
              <Text>{app.name}</Text>
              <Text>{app.url}</Text>
            </View>
            <View style={{ marginTop: 15 }}>
              <Text>{i18n.t("modalsendofferpromotext")}</Text>
            </View>
            <Form.Section title="Information du contacte">
              <Form.Field
                label={i18n.t("formfieldemail")}
                type="email"
                autoCompleteType="email"
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
                required
                value={email}
                onChangeText={setEmail}
              />
              <Form.Field
                label={i18n.t("formfieldphonenumber")}
                required
                type="text"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                autoCompleteType="cc-number"
                keyboardType="phone-pad"
              />
              <Form.Field
                label={i18n.t("formfieldcontactpref")}
                type="switch"
                options={[
                  {
                    label: i18n.t("formfieldemail"),
                    value: "email",
                    accessibilityLabel: "switch-one",
                  },
                  {
                    label: i18n.t("formfieldphone"),
                    value: "phone",
                    accessibilityLabel: "switch-one",
                  },
                ]}
                onChangeText={(text) =>
                  setChoiceContact(text as "email" | "phone")
                }
                value={choiceContact}
              />
            </Form.Section>
            <Form.Section title={i18n.t("formsectioninfos")}>
              <Form.Field
                label={i18n.t("formfieldmessage")}
                type="textarea"
                value={message}
                onChangeText={setMessage}
              />
              <Form.Field
                label={i18n.t("formfieldinfocomplementary")}
                type="textarea"
                value={informationTest}
                onChangeText={setInformationTest}
              />
            </Form.Section>
          </View>
        </Form>
      </KeyboardAvoidingView>
      <Form.Submit
        content={i18n.t("formsubmitsend")}
        onSubmit={onSubmit}
        disabled={!formIsValid()}
      />
    </Modal>
  );
};

export default ModalSendOffer;
