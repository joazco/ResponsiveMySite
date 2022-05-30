const utils = require("../utils");

module.exports = (() => {
  const findTitle = ($) => {
    const h1 = $("h1").text();
    if (h1 && h1 !== "") {
      return h1;
    }
    const h2 = $("h2").text();
    if (h2 && h2 !== "") {
      return h2;
    }
    return null;
  };

  const findIcon = ($) => {
    const imageHeader = $("header img").attr("src");
    if (imageHeader && imageHeader !== "") {
      return imageHeader;
    }
    const firstImage = $("img").attr("src");
    if (firstImage && firstImage !== "") {
      return firstImage;
    }
    return utils.imageNotFound;
  };

  const findDescription = ($) => {
    const subTitle = $("h1 p").text();
    if (subTitle && subTitle !== "") {
      return subTitle;
    }
    const subTitleH2 = $("h2 p").text();
    if (subTitleH2 && subTitleH2 !== "") {
      return subTitleH2;
    }
    const pOfFirstArticle = $("article p").text();
    if (pOfFirstArticle && pOfFirstArticle !== "") {
      return pOfFirstArticle;
    }

    return null;
  };

  const execute = ($, data) =>
    new Promise((resolve) => {
      if (data.title === null) {
        data.title = findTitle($);
      }
      if (data.icon === null) {
        data.icon = findIcon($);
      }
      if (data.themeColor === null) {
        data.themeColor = null;
      }
      // if (data.description === null) {
      //   data.description = findDescription($);
      // }
      resolve(data);
    });

  return execute;
})();
