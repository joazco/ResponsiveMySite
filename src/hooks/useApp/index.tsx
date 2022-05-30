import React, { useCallback, useEffect, useState, useMemo } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously } from "firebase/auth";
import * as Linking from "expo-linking";
import i18n from "../../translations/i18n";

import {
  NotificationType,
  SplashScreenType,
  StatusBarType,
  VersionType,
  WebApp,
  WebAppFirebase,
} from "../../../types";
import theme from "../../../styles";
import useDatabase from "../useDatabase";
import { useFirebase } from "..";
import {
  androidPackageName,
  APP_VERSION,
  defaultApps,
  defaultSplashScreen,
  itunesItemId,
  maxApp,
} from "../../../utils";
import { Alert, BackHandler, Platform } from "react-native";

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
};

// Initialize Firebase
initializeApp(firebaseConfig);

const useApp = () => {
  const { setItem, getItem } = useDatabase();
  const { getVersion, getApps, getApp, removeApp } = useFirebase();
  const [showSplashScreen, setShowSplashScreen] =
    useState<SplashScreenType | null>(defaultSplashScreen);
  const [codes, setCodes] = useState<number[]>([]);
  const [codesOfferSended, setCodesOfferSended] = useState<number[]>([]);
  const [apps, setApps] = useState<WebAppFirebase[]>([]);
  const [currentApp, setCurrentApp] = useState<WebApp | null>(null);
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [uid, setUid] = useState<string | null>(null);
  const [showModalCode, setShowModalCode] = useState<boolean>(false);
  const [notification, setNotification] = useState<NotificationType | null>(
    null
  );
  const [version, setVersion] = useState<VersionType | null>(null);

  const openModalCreateApp = (action: "create" | "append" = "create") => {
    if (maxApp >= apps.length) {
      action === "create" ? setOpenForm(true) : setShowModalCode(true);
    } else {
      setNotification({
        content: i18n.t("alertmaxapp"),
        type: "error",
      });
    }
  };

  const statusBar: StatusBarType = useMemo(() => {
    if (currentApp) {
      return currentApp.statusBar;
    }
    return {
      backgroundColor: theme.primary,
      style: "light",
    };
  }, [currentApp]);

  const refreshApps = useCallback(() => {
    getItem<number[]>("apps")
      .then((data) =>
        setCodes(
          data.some((x) => defaultApps.some((y) => y === x))
            ? data
            : data.concat(defaultApps)
        )
      )
      .catch(() => {
        setCodes(defaultApps);
      });
  }, []);

  const removeAllApps = useCallback(() => {
    Alert.alert(
      i18n.t("alertremoveallappstitle"),
      i18n.t("alertremoveallappsmessage"),
      [
        {
          text: i18n.t("btncancel"),
          style: "cancel",
        },
        {
          text: i18n.t("btnconfirm"),
          onPress: () => {
            apps
              .filter((app) => app.uid == uid)
              .forEach((app) => removeApp(app.id));
            setItem("apps", []).then(() => {
              setCodes([]);
              refreshApps();
            });
          },
        },
      ]
    );
  }, [apps]);

  const appendApp = useCallback(
    (code: number) => {
      setShowModalCode(false);
      if (codes.includes(code) || isNaN(code)) {
        return;
      }

      setShowSplashScreen({
        backgroundColor: theme.primary,
        delay: "3",
        spinner: {
          color: theme.white,
          size: "small",
        },
        text: i18n.t("splashscreeninstallapp"),
      });
      getApp(code)
        .then((data) => {
          if (data) {
            const newCodes = Array.from(codes.concat(code));
            setCodes(newCodes);
            setItem("apps", newCodes).then(() =>
              setTimeout(() => setShowSplashScreen(null), 3000)
            );
          } else {
            setTimeout(() => setShowSplashScreen(null), 3000);
            setTimeout(
              () =>
                setNotification({
                  content: i18n
                    .t("notificationerrorappcodenotfound")
                    .replace("${code}", code.toString()),
                  type: "error",
                }),
              3500
            );
          }
        })
        .catch(() => setTimeout(() => setShowSplashScreen(null), 3000));
    },
    [codes]
  );

  const alertInfoIfFirstClose = useCallback(() => {
    getItem("firstClose").catch(() => {
      Alert.alert(
        i18n.t("alertinfofirstclosetitle"),
        i18n.t("alertinfofirstclosemessage"),
        [
          {
            text: i18n.t("btnok"),
            onPress: () => setItem("firstClose", true),
          },
        ]
      );
    });
  }, []);

  useEffect(() => {
    if (uid) {
      refreshApps();
    }
  }, [uid]);

  useEffect(() => {
    if (codes.length > 0) {
      getApps(codes).then(setApps);
    } else {
      setApps([]);
    }
  }, [codes]);

  useEffect(() => {
    if (version !== null) {
      Alert.alert(
        i18n.t("alertnewversiontitle"),
        i18n.t("alertnewversionmessage"),
        [
          {
            text: version.critical ? i18n.t("btndownload") : i18n.t("btnok"),
            onPress: () => {
              if (version.critical) {
                if (Platform.OS === "android") {
                  Linking.openURL(
                    `market://details?id=${androidPackageName}&showAllReviews=true`
                  );
                } else if (Platform.OS === "ios") {
                  Linking.openURL(
                    `itms-apps://itunes.apple.com/app/viewContentsUserReviews/id${itunesItemId}?action=write-review`
                  );
                }
                BackHandler.exitApp();
              }
            },
            style: "default",
          },
        ]
      );
    }
  }, [version]);

  useEffect(() => {
    const auth = getAuth();
    signInAnonymously(auth)
      .then((response) => {
        setUid(response.user.uid);
      })
      .catch((error) => {});
  }, []);

  useEffect(() => {
    getVersion()
      .then((response) => {
        const data = response.data();
        if (data && data?.value !== APP_VERSION) {
          setVersion({ value: data.value, critical: data.critical });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return {
    codes,
    showSplashScreen,
    apps,
    currentApp,
    statusBar,
    openForm,
    uid,
    showModalCode,
    notification,
    codesOfferSended,
    version,
    setCodes,
    setApps,
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
  };
};

export default useApp;

// "build-ts": "tsc; mv src/*.js dist/; cp src/index.ts dist/index.d.ts;cp src/types.ts dist",
