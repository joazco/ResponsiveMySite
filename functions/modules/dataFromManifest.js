const axios = require("axios");

module.exports = (() => {
  const generateUrl = (url, manifest) => {
    if (manifest.includes(url)) {
      return manifest;
    }

    return `${url}${manifest}`;
  };

  const extract = (url, manifest) =>
    new Promise((resolve) => {
      if (!manifest) {
        resolve({ url });
        return;
      }
      axios
        .get(generateUrl(url, manifest))
        .then((res) => {
          const dataManifest = res.data;

          const { name, short_name, theme_color, icons, description } =
            dataManifest;
          const findBetterIcon =
            icons && icons.find((icon) => icon.sizes === "144x144");
          const finalData = {
            title: short_name ? short_name : name ? name : undefined,
            description: description || undefined,
            icon: (findBetterIcon && findBetterIcon.src) || undefined,
            themeColor: theme_color || undefined,
            url,
          };
          resolve(finalData);
        })
        .catch(() => resolve({ url }));
    });

  return extract;
})();
