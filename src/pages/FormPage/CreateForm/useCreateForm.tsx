import { useCallback, useReducer, useState, useEffect } from "react";
import * as ScreenOrientation from "expo-screen-orientation";

import theme from "../../../../styles";
import { ResponseApi, WebApp, WebAppFirebase } from "../../../../types";
import { lightOrDark } from "../../../../utils";
import createFormReducer, { defaultState } from "./createFormReducer";
import { useRest } from "../../../hooks";

const useCreateForm = (defaultValue: Partial<WebAppFirebase>) => {
  const [state, dispatch] = useReducer(createFormReducer, defaultState);
  const [webApp, setWebApp] = useState<Partial<WebAppFirebase>>(defaultValue);
  const { fetchWebSiteInfo: fetchWebSiteInfoHook } = useRest();

  const { url, name, themeColor, icon } = webApp;
  const { loading, showErrorNotFound } = state;

  const fetchWebSiteInfo = useCallback(() => {
    if (!url) return;
    dispatch("fetchUrl");
    fetchWebSiteInfoHook(url)
      .then((result: ResponseApi) => {
        const { error, title, description, icon, themeColor } = result;
        const primaryColor = themeColor || theme.primary;

        if (error) {
          dispatch("urlNotFound");
        } else {
          dispatch("urlFind");
          setWebApp({
            url,
            name: title || "No Name App",
            description: description || "no description",
            icon,
            themeColor: primaryColor,
            statusBar: {
              style: lightOrDark(primaryColor) === "dark" ? "light" : "dark",
              backgroundColor: primaryColor,
            },
            splashScreen: {
              delay: "1.5",
              backgroundColor: theme.white,
              spinner: null,
            },
            orientation: ScreenOrientation.OrientationLock.PORTRAIT,
            openExternalUrl: "sameDomain",
            geolocation: false,
            notificationPush: false,
          });
        }
      })
      .catch(() => {
        dispatch("urlNotFound");
      });
  }, [url]);

  useEffect(() => {
    if (showErrorNotFound) {
      dispatch("reset");
    }
  }, [webApp]);

  return {
    webApp,
    url,
    loading,
    showErrorNotFound,
    name,
    themeColor,
    setWebApp,
    fetchWebSiteInfo,
  };
};

export default useCreateForm;
