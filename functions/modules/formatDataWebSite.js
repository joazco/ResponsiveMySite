const utils = require("../utils");

module.exports = (() => {
  const formatUrlImage = (data) => {
    const { icon, url } = data;

    if (icon && icon.startsWith("/")) {
      const finalUrl = url.endsWith("/")
        ? url.substring(0, url.length - 1)
        : url;
      return `${finalUrl}${icon}`;
    }
    return icon;
  };

  const execute = (data) => {
    const finalIcon = formatUrlImage(data);
    return {
      ...data,
      icon: utils.isLinkImage(finalIcon) ? finalIcon : utils.imageNotFound,
    };
  };
  return execute;
})();
