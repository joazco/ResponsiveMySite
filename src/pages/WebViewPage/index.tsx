import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { View } from "react-native-animatable";
import WebView from "react-native-webview";
import { Feather } from "@expo/vector-icons";

import theme from "../../../styles";
import { OfflineComponent, SplashScreen } from "../../components";
import useWebView from "./useWebView";

let isRefresh = false;

const styles = StyleSheet.create({
  webViewPageContainer: {
    flex: 1,
  },
  webViewPageFooter: {
    padding: 10,
    paddingRight: 30,
    alignItems: "flex-start",
    justifyContent: "space-between",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: theme.light,
    backgroundColor: theme.white,
  },
  webViewPageFooterText: {
    fontSize: 10,
    fontStyle: "italic",
  },
  webViewPageFooterIcon: {
    fontSize: 16,
  },
});
type WebViewPageProps = {
  onClose?: () => void;
};
const WebViewPage = ({ onClose }: WebViewPageProps) => {
  const {
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
  } = useWebView(onClose);

  if (!currentApp) return null;

  return (
    <React.Fragment>
      {loading && (
        <SplashScreen
          text={currentApp.name}
          icon={currentApp.icon}
          onClose={() => setOpenSplashScreen(false)}
          splashScreen={currentApp.splashScreen}
        />
      )}
      <View
        style={[
          styles.webViewPageContainer,
          { display: loading ? "none" : "flex" },
        ]}
      >
        {isConnected ? (
          <WebView
            ref={webViewRef}
            source={{ uri: currentApp.url }}
            style={styles.webViewPageContainer}
            originWhitelist={["*"]}
            onNavigationStateChange={handleWebViewNavigationStateChange}
            onShouldStartLoadWithRequest={handleShouldStartLoadWithRequest}
            geolocationEnabled={currentApp.geolocation}
            allowFileAccess
            javaScriptEnabled
            mediaPlaybackRequiresUserAction
            allowsFullscreenVideo
            cacheMode="LOAD_DEFAULT"
            cacheEnabled
            sharedCookiesEnabled
            startInLoadingState
            scalesPageToFit={false}
            injectedJavaScriptBeforeContentLoaded={javascript}
            setBuiltInZoomControls={false}
            onLoadEnd={() => !loaded && setLoaded(true)}
          />
        ) : (
          <View style={styles.webViewPageContainer}>
            <OfflineComponent name={currentApp.name} color={theme.primary} />
          </View>
        )}

        <View style={styles.webViewPageFooter}>
          <Text style={styles.webViewPageFooterText}>
            Generated by Joazco.com
          </Text>
          <Pressable
            onPress={() => {
              setCurrentApp(null);
              onClose && onClose();
            }}
          >
            <Feather name="x" style={styles.webViewPageFooterIcon} />
          </Pressable>
        </View>
      </View>
    </React.Fragment>
  );
};

export default WebViewPage;