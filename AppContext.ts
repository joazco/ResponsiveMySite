import { createContext } from "react";
import { SplashScreenType, WebApp, WebAppFirebase } from "./types";

interface AppContextInterface {
  codes: number[];
  codesOfferSended: number[];
  apps: WebAppFirebase[];
  currentApp: WebApp | null;
  uid: string | null;
  setCodes: (codes: number[]) => void;
  setCodesOfferSended: (codes: number[]) => void;
  setCurrentApp: (app: WebApp | null) => void;
  setShowSplashScreen: (splashScreen: SplashScreenType | null) => void;
}

const AppContext = createContext<AppContextInterface>({
  codes: [],
  codesOfferSended: [],
  apps: [],
  currentApp: null,
  uid: null,
  setCodes: () => {},
  setCurrentApp: () => {},
  setShowSplashScreen: () => {},
  setCodesOfferSended: () => {},
});

export default AppContext;
