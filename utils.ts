import theme from "./styles";
import { SplashScreenType } from "./types";

export const APP_VERSION = "1.0.0";
export const itunesItemId = "1596140686";
export const androidPackageName = "com.joazco.responsiveMySite";
export const defaultApps = [401];
export const maxApp = 9;
export const defaultSplashScreen: SplashScreenType = {
  backgroundColor: theme.primary,
  delay: "3",
  text: "ResponsiveMySite",
  spinner: {
    size: "small",
    color: theme.tertiary,
  },
};
export const isLink = (link: string): boolean =>
  /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g.test(
    link
  );
// export const isLinkImage = (link: string): boolean => {
//   return /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|png|ico)/g.test(link);
// };
export const isLinkImage = (link: string): boolean =>
  /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g.test(
    link
  ) || link.startsWith("data:image/");
export const isEmail = (email: string): boolean =>
  /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/g.test(email);
export const getLink = (url: string) => {
  return url.split("/")[2];
};
export const getDomain = (url: string): string | null => {
  const link = getLink(url);
  const domains = link.split(".");
  const domain = domains[domains.length - 2];
  return domain;
};
export const checkSameLink = (url: string, target: string) => {
  return getLink(url) === getLink(target);
};
export const checkSameDomain = (url: string, target: string) => {
  const domainUrl = getDomain(url);
  const domainTarget = getDomain(target);
  return true;
  if (!domainUrl || !domainTarget) return true;
  return domainUrl === domainTarget;
};
export const maxImageFileKB = 7;
export const isLessThanTheKB = (
  fileSize: number,
  smallerThanSizeMB: number
) => {
  const isOk = fileSize / 1024 < smallerThanSizeMB;
  return isOk;
};
export const getTypeImage = (image: string) => {
  if (image.includes(".jpg")) return ".jpg";
  if (image.includes(".jpeg")) return ".jpeg";
  if (image.includes(".ico")) return ".ico";
  if (image.includes(".png")) return ".png";
};
export const lightOrDark = (color: any) => {
  if (color === "white") {
    return "light";
  }
  if (color === "black") {
    return "dark";
  }
  // Variables for red, green, blue values
  var r, g, b, hsp;

  // Check the format of the color, HEX or RGB?
  if (color.match(/^rgb/)) {
    // If HEX --> store the red, green, blue values in separate variables
    color = color.match(
      /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/
    );

    r = color[1];
    g = color[2];
    b = color[3];
  } else {
    // If RGB --> Convert it to HEX: http://gist.github.com/983661
    color = +("0x" + color.slice(1).replace(color.length < 5 && /./g, "$&$&"));

    r = color >> 16;
    g = (color >> 8) & 255;
    b = color & 255;
  }

  // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
  hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));

  // Using the HSP value, determine whether the color is light or dark
  if (hsp > 127.5) {
    return "light";
  } else {
    return "dark";
  }
};
