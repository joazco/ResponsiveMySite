import * as ScreenOrientation from "expo-screen-orientation";
export type LightOrDark = "light" | "dark";
export type Logo = string | null;
export type Spinner = {
  color: string;
  size: "small" | "large";
};
export type SplashScreenType = {
  delay: string;
  backgroundColor: string;
  spinner: Spinner | null;
  text?: string;
  icon?: Logo;
};
export type StatusBarType = {
  backgroundColor: string;
  style: LightOrDark;
};
export type WebApp = {
  url: string;
  name: string;
  description?: string;
  icon: Logo;
  themeColor: string;
  statusBar: StatusBarType;
  splashScreen: SplashScreenType;
  orientation:
    | ScreenOrientation.OrientationLock.LANDSCAPE
    | ScreenOrientation.OrientationLock.PORTRAIT
    | ScreenOrientation.OrientationLock.ALL;
  openExternalUrl: "self" | "system" | "sameDomain";
  geolocation?: boolean;
  notificationPush?: boolean;
};
export type WebAppFirebase = WebApp & { uid: string; id: string; code: number };
export type ResponseApi = {
  error?: string;
  title: string | null;
  description: string | null;
  icon: Logo;
  themeColor: string | null;
  url: string;
};
export type NotificationType = {
  content: string;
  type: "success" | "error";
  delay?: string;
};
export type Email = {
  appName: string;
  appCode: string;
  email: string;
  phoneNumber: string;
  choiceContact: "email" | "phone";
  message: string;
  informationTest: string;
};
export type VersionType = {
  value: string;
  critical: boolean;
};
