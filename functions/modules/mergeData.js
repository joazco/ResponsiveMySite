const utils = require("../utils");

module.exports = (() => {
  const merge = (datas) =>
    new Promise((resolve) => {
      try {
        const finalData = { ...datas[0], ...datas[1] };

        resolve({
          ...finalData,
          themeColor: utils.transformColor(finalData.themeColor) || null,
        });
      } catch (e) {
        resolve({});
      }
    });

  return merge;
})();
