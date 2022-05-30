module.exports = (() => {
  const imageNotFound = null;
  const publicApiKey = "rZEs56L3paRpRvZ8y558";
  const functionsUrl =
    "https://us-central1-responsivemysite-17b70.cloudfunctions.net/";

  function rgbToHex(rgb) {
    return (
      "#" +
      rgb
        .match(/[0-9|.]+/g)
        .map((x, i) =>
          i === 3
            ? parseInt(255 * parseFloat(x)).toString(16)
            : parseInt(x).toString(16)
        )
        .join("")
    );
  }

  function rgbaToHex(color) {
    if (/^rgb/.test(color)) {
      const rgba = color.replace(/^rgba?\(|\s+|\)$/g, "").split(",");

      // rgb to hex
      // eslint-disable-next-line no-bitwise
      let hex = `#${(
        (1 << 24) +
        (parseInt(rgba[0], 10) << 16) +
        (parseInt(rgba[1], 10) << 8) +
        parseInt(rgba[2], 10)
      )
        .toString(16)
        .slice(1)}`;

      // added alpha param if exists
      if (rgba[4]) {
        const alpha = Math.round(0o1 * 255);
        const hexAlpha = (alpha + 0x10000)
          .toString(16)
          .substr(-2)
          .toUpperCase();
        hex += hexAlpha;
      }

      return hex;
    }
    return color;
  }

  function transformColor(color) {
    if (!color) return color;
    if (color.includes("rgba")) {
      return rgbaToHex(color);
    }
    if (color.includes("rgb")) {
      return rgbToHex(color);
    }
    if (!color.startsWith("#")) {
      return null;
    }
    return color;
  }

  function isLinkImage(link) {
    return /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|png|ico)/g.test(link);
  }

  function isLink(link) {
    return /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g.test(
      link
    );
  }

  return {
    imageNotFound,
    publicApiKey,
    functionsUrl,
    rgbToHex,
    rgbaToHex,
    transformColor,
    isLinkImage,
    isLink,
  };
})();
