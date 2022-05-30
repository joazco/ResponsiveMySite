import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Alert, BackHandler, Linking } from "react-native";
import { WebViewNavigation } from "react-native-webview";
import NetInfo from "@react-native-community/netinfo";
import * as ScreenOrientation from "expo-screen-orientation";
import * as Location from "expo-location";
import * as Notifications from "expo-notifications";

import AppContext from "../../../AppContext";
import { ShouldStartLoadRequest } from "react-native-webview/lib/WebViewTypes";
import { checkSameDomain, checkSameLink, isLink } from "../../../utils";
import i18n from "../../translations/i18n";

let canGoBack = false;
const responsiveMeta = `
      const meta = document.createElement('meta'); 
      meta.name = 'viewport';
      meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
      const head = document.getElementsByTagName('head')[0];
      head.appendChild(meta);
`;
const refreshHtml = `window.location.reload( true )`;

const useWebView = (onClose?: () => void) => {
  const [openSplashScreen, setOpenSplashScreen] = useState<boolean>(true);
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { currentApp, setCurrentApp } = useContext(AppContext);
  const webViewRef = useRef(null);
  const [positionState, setPositionState] = useState<
    Location.LocationObject | null | undefined
  >();
  const [loaded, setLoaded] = useState<boolean>(false);
  const javascript = useMemo(() => {
    let javascriptString = responsiveMeta;
    if (positionState) {
      javascriptString += `${javascriptString}
      navigator.geolocation.getCurrentPosition = function(callback){
        callback(${JSON.stringify(positionState)});
      }
    `;
    }

    return javascriptString;
  }, [positionState]);

  const getLocation = () => {
    // set location for ios
    if (currentApp && currentApp.geolocation) {
      Location.requestForegroundPermissionsAsync().then(({ status }: any) => {
        if (status !== "granted") return;
        Location.getCurrentPositionAsync().then((location) => {
          setPositionState(location);
        });
      });
    } else {
      setPositionState(null);
    }
  };

  const sendNotification = () => {
    Notifications.scheduleNotificationAsync({
      content: {
        title: `Notification by ${currentApp?.name}`,
        body: i18n.t("notificationdemobody"),
      },
      trigger: null,
    });
  };

  const getNotificationPush = () => {
    if (currentApp && currentApp.notificationPush) {
      Notifications.getPermissionsAsync().then(({ status: existingStatus }) => {
        console.log(existingStatus);
        if (existingStatus !== "granted") {
          Notifications.requestPermissionsAsync().then(({ status }) => {
            if (status !== "granted") {
              alert("Failed to get push token for push notification!");
              return;
            }
            sendNotification();
          });
        } else {
          sendNotification();
        }
      });
    }
  };

  const handleWebViewNavigationStateChange = (event: WebViewNavigation) => {
    const { canGoBack: canGoBackEvent, url } = event;
    if (!currentApp) return false;

    if (url) {
      canGoBack = canGoBackEvent;
    }
    return true;
  };

  const handleShouldStartLoadWithRequest = (event: ShouldStartLoadRequest) => {
    const { url } = event;
    if (!currentApp || !isLink(url)) return true;
    switch (currentApp.openExternalUrl) {
      case "sameDomain":
        if (!checkSameDomain(url, currentApp.url)) {
          Linking.openURL(event.url);
          return false;
        }
      case "self":
        return true;
      case "system":
      default:
        if (!checkSameLink(url, currentApp.url)) {
          Linking.openURL(event.url);
          return false;
        }
    }

    return true;
  };

  const backAction = useCallback(() => {
    if (canGoBack && webViewRef.current) {
      webViewRef.current.goBack();
    } else {
      Alert.alert(
        i18n.t("modalbackapptitle"),
        i18n.t("modalbackappmessage").replace("{name}", currentApp?.name || ""),
        [
          {
            text: "Annuler",
            onPress: () => null,
            style: "cancel",
          },
          {
            text: "Confirmer",
            onPress: () => {
              setCurrentApp(null);
              onClose && onClose();
            },
          },
        ]
      );
    }

    return true;
  }, [webViewRef]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(({ isConnected }) => {
      setIsConnected(isConnected);
    });
    return () => {
      // To unsubscribe to these update, just use:
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (currentApp) {
      setTimeout(() => {
        ScreenOrientation.lockAsync(currentApp.orientation);
      }, Number(currentApp.splashScreen.delay) * 1000);
    }
    return () => {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    };
  }, [currentApp]);

  useEffect(() => {
    if (currentApp) {
      getLocation();
      getNotificationPush();
    }
  }, [currentApp]);

  useEffect(() => {
    if (typeof positionState !== "undefined" && !openSplashScreen) {
      setLoading(false);
    }
  }, [openSplashScreen, positionState]);

  // reload page for update html
  useEffect(() => {
    if (loaded && webViewRef.current && webViewRef.current.injectJavaScript) {
      webViewRef.current.injectJavaScript(refreshHtml);
    }
  }, [loaded, webViewRef]);

  return {
    currentApp,
    webViewRef,
    isConnected,
    loading,
    javascript,
    loaded,
    handleShouldStartLoadWithRequest,
    handleWebViewNavigationStateChange,
    setCurrentApp,
    setOpenSplashScreen,
    setLoaded,
  };
};

export default useWebView;
