import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import * as ScreenOrientation from "expo-screen-orientation";

import Form from "../../../components/Form";
import theme from "../../../../styles";
import { WebAppFirebase } from "../../../../types";
import { isLink } from "../../../../utils";
import useCreateForm from "./useCreateForm";
import i18n from "../../../translations/i18n";

export type CreateFormProps = {
  defaultValue?: Partial<WebAppFirebase>;
  isEdit: boolean;
  onSubmit: (app: WebAppFirebase) => void;
};

const CreateForm = ({
  defaultValue = { url: "https://" },
  isEdit,
  onSubmit,
}: CreateFormProps) => {
  const {
    webApp,
    url,
    loading,
    showErrorNotFound,
    name,
    themeColor,
    fetchWebSiteInfo,
    setWebApp,
  } = useCreateForm(defaultValue);
  return (
    <React.Fragment>
      {typeof name !== "undefined" && (
        <Pressable
          style={{
            paddingBottom: 10,
            paddingTop: 10,
            justifyContent: "center",
            backgroundColor: "white",
            borderBottomWidth: 1,
            borderBottomColor: theme.light,
            flexDirection: "row",
            alignItems: "center",
          }}
          onPress={() => !isEdit && setWebApp({ url: webApp.url })}
        >
          {!isEdit && (
            <Feather style={{ fontSize: 16, marginRight: 10 }} name="edit-3" />
          )}
          <Text style={{ fontSize: 24 }}>{webApp.url}</Text>
        </Pressable>
      )}
      <KeyboardAvoidingView
        style={{
          flex: 1,
          backgroundColor: theme.white,
        }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View
          style={{
            paddingLeft: 10,
            paddingRight: 10,
            flex: 1,
          }}
        >
          {typeof name !== "undefined" && (
            <Form>
              <Form.Section title={i18n.t("formfieldsectioninfos")}>
                <Form.Field
                  label={i18n.t("formfieldnameapp")}
                  required
                  onChangeText={(value) =>
                    setWebApp({ ...webApp, name: value })
                  }
                  icon="tag"
                  value={name}
                  maxLength={20}
                />
                <Form.Field
                  label={i18n.t("formfieldcolorprimary")}
                  required
                  onChangeText={(value) =>
                    setWebApp({
                      ...webApp,
                      themeColor: value,
                    })
                  }
                  icon="target"
                  value={themeColor}
                  type="color"
                />
                <Form.Field
                  label={i18n.t("formfieldimage")}
                  required
                  icon="image"
                  onChangeText={(text) => setWebApp({ ...webApp, icon: text })}
                  value={webApp.icon as any}
                  type="image"
                />
              </Form.Section>
              <Form.Section title={i18n.t("formfieldsectionstatusbar")}>
                <Form.Field
                  label={i18n.t("formfieldstatusbarbgcolor")}
                  onChangeText={(value) =>
                    setWebApp({
                      ...webApp,
                      statusBar: {
                        style: webApp.statusBar
                          ? webApp.statusBar.style
                          : "light",
                        backgroundColor: value,
                      },
                    })
                  }
                  value={webApp.statusBar?.backgroundColor}
                  type="color"
                />
                <Form.Field
                  label={i18n.t("formfieldstatusbarcolortext")}
                  onChangeText={(value: any) =>
                    setWebApp({
                      ...webApp,
                      statusBar: {
                        style: value,
                        backgroundColor: webApp.statusBar
                          ? webApp.statusBar.backgroundColor
                          : theme.primary,
                      },
                    })
                  }
                  value={webApp.statusBar?.style}
                  type="switch"
                  options={[
                    {
                      label: i18n.t("optionWhite"),
                      value: "light",
                      accessibilityLabel: "switch-one",
                    },
                    {
                      label: i18n.t("optionBlack"),
                      value: "dark",
                      accessibilityLabel: "switch-one",
                    },
                  ]}
                />
              </Form.Section>
              <Form.Section title={i18n.t("formfieldsplashscreensection")}>
                <Form.Field
                  label={i18n.t("formfieldsplashscreendelay")}
                  onChangeText={(value) => {
                    if (webApp.splashScreen) {
                      setWebApp({
                        ...webApp,
                        splashScreen: {
                          ...webApp.splashScreen,
                          delay: value,
                        },
                      });
                    }
                  }}
                  value={webApp.splashScreen?.delay}
                  type="number"
                  unit="secondes"
                  maxLength={10}
                />
                <Form.Field
                  label={i18n.t("formfieldsplashscreenbgcolor")}
                  onChangeText={(value) => {
                    if (webApp.splashScreen) {
                      setWebApp({
                        ...webApp,
                        splashScreen: {
                          ...webApp.splashScreen,
                          backgroundColor: value,
                        },
                      });
                    }
                  }}
                  value={webApp.splashScreen?.backgroundColor}
                  type="color"
                />
                <Form.Field
                  label={i18n.t("formfieldsplashscreenspinner")}
                  onChangeText={(value: any) => {
                    if (webApp.splashScreen && value === "yes") {
                      setWebApp({
                        ...webApp,
                        splashScreen: {
                          ...webApp.splashScreen,
                          spinner: {
                            color: webApp.themeColor || theme.primary,
                            size: "small",
                          },
                        },
                      });
                    } else if (webApp.splashScreen) {
                      setWebApp({
                        ...webApp,
                        splashScreen: {
                          ...webApp.splashScreen,
                          spinner: null,
                        },
                      });
                    }
                  }}
                  value={webApp.splashScreen?.spinner !== null ? "yes" : "no"}
                  type="switch"
                />
                {webApp.splashScreen && webApp.splashScreen.spinner !== null ? (
                  <React.Fragment>
                    <Form.Field
                      label={i18n.t("formfieldsplashscreenspinnercolor")}
                      onChangeText={(value) => {
                        if (webApp.splashScreen) {
                          setWebApp({
                            ...webApp,
                            splashScreen: {
                              ...webApp.splashScreen,
                              spinner: {
                                color: value || theme.primary,
                                size: webApp.splashScreen.spinner
                                  ? webApp.splashScreen.spinner.size
                                  : "small",
                              },
                            },
                          });
                        }
                      }}
                      value={webApp.splashScreen.spinner.color}
                      type="color"
                    />
                    <Form.Field
                      label={i18n.t("formfieldsplashscreenspinnersize")}
                      onChangeText={(value: any) => {
                        if (webApp.splashScreen) {
                          setWebApp({
                            ...webApp,
                            splashScreen: {
                              ...webApp.splashScreen,
                              spinner: {
                                color:
                                  webApp.splashScreen.spinner?.color ||
                                  theme.primary,
                                size: value,
                              },
                            },
                          });
                        }
                      }}
                      value={
                        webApp.splashScreen?.spinner !== null
                          ? webApp.splashScreen.spinner.size
                          : "small"
                      }
                      type="switch"
                      options={[
                        {
                          label: i18n.t("optionsmall"),
                          value: "small",
                          accessibilityLabel: "switch-one",
                        },
                        {
                          label: i18n.t("optionbig"),
                          value: "large",
                          accessibilityLabel: "switch-one",
                        },
                      ]}
                    />
                  </React.Fragment>
                ) : (
                  <React.Fragment />
                )}
              </Form.Section>
              <Form.Section title={i18n.t("formfieldsectionadvancedparameter")}>
                <Form.Field
                  label={i18n.t("formfieldadvancedorientation")}
                  onChangeText={(value: any) => {
                    setWebApp({
                      ...webApp,
                      orientation: Number(value),
                    });
                  }}
                  value={
                    webApp.orientation
                      ? webApp.orientation.toString()
                      : ScreenOrientation.OrientationLock.PORTRAIT.toString()
                  }
                  type="switch"
                  options={[
                    {
                      label: i18n.t("optionportrait"),
                      value:
                        ScreenOrientation.OrientationLock.PORTRAIT.toString(),
                      accessibilityLabel: "switch-one",
                    },
                    {
                      label: i18n.t("optionlandscape"),
                      value:
                        ScreenOrientation.OrientationLock.LANDSCAPE.toString(),
                      accessibilityLabel: "switch-one",
                    },
                    {
                      label: i18n.t("optionall"),
                      value: ScreenOrientation.OrientationLock.ALL.toString(),
                      accessibilityLabel: "switch-one",
                    },
                  ]}
                />
                <Form.Field
                  label={i18n.t("formfieldopenurl")}
                  onChangeText={(value: any) => {
                    setWebApp({
                      ...webApp,
                      openExternalUrl: value,
                    });
                  }}
                  value={webApp.openExternalUrl}
                  type="switch"
                  options={[
                    {
                      label: i18n.t("optionyes"),
                      value: "self",
                      accessibilityLabel: "switch-one",
                    },
                    {
                      label: i18n.t("optionno"),
                      value: "system",
                      accessibilityLabel: "switch-one",
                    },
                    {
                      label: i18n.t("optionsamedomain"),
                      value: "sameDomain",
                      accessibilityLabel: "switch-one",
                    },
                  ]}
                />
                <Form.Field
                  label={i18n.t("formfieldgeolocation")}
                  onChangeText={(value: any) => {
                    setWebApp({
                      ...webApp,
                      geolocation: value === "yes",
                    });
                  }}
                  value={webApp.geolocation ? "yes" : "no"}
                  type="switch"
                  options={[
                    {
                      label: i18n.t("optionyes"),
                      value: "yes",
                      accessibilityLabel: "switch-one",
                    },
                    {
                      label: i18n.t("optionno"),
                      value: "no",
                      accessibilityLabel: "switch-one",
                    },
                  ]}
                />
                <Form.Field
                  label={i18n.t("formfieldnotificationpush")}
                  onChangeText={(value: any) => {
                    setWebApp({
                      ...webApp,
                      notificationPush: value === "yes",
                    });
                  }}
                  value={webApp.notificationPush ? "yes" : "no"}
                  type="switch"
                  options={[
                    {
                      label: i18n.t("optionyes"),
                      value: "yes",
                      accessibilityLabel: "switch-one",
                    },
                    {
                      label: i18n.t("optionno"),
                      value: "no",
                      accessibilityLabel: "switch-one",
                    },
                  ]}
                />
              </Form.Section>
            </Form>
          )}
          {typeof name === "undefined" && (
            <View
              style={{
                justifyContent: "center",
                flex: 1,
              }}
            >
              <Form.Field
                label={i18n.t("formfieldurl")}
                required
                onChangeText={(value) =>
                  setWebApp({ ...webApp, url: value.trim().toLowerCase() })
                }
                value={url}
                icon="link"
                loading={loading}
                preset={showErrorNotFound ? "warning" : "default"}
                warning={
                  showErrorNotFound ? i18n.t("formfieldurlwarning") : undefined
                }
                autoCorrect={false}
                returnKeyType="search"
                onSubmitEditing={() =>
                  webApp.url && isLink(webApp.url) && fetchWebSiteInfo()
                }
              />
            </View>
          )}
        </View>
      </KeyboardAvoidingView>
      {typeof name !== "undefined" ? (
        <Form.Submit
          content={
            isEdit ? i18n.t("formsubmitedit") : i18n.t("formfieldsubmitcreate")
          }
          onSubmit={() => onSubmit(webApp as WebAppFirebase)}
          disabled={!!!name}
        />
      ) : (
        <Form.Submit
          content={i18n.t("formsearchbtn")}
          onSubmit={() => webApp.url && fetchWebSiteInfo()}
          disabled={(webApp.url ? !isLink(webApp.url) : true) || loading}
        />
      )}
    </React.Fragment>
  );
};

export default CreateForm;
