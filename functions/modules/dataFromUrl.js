module.exports = (() => {
  const extract = ($) =>
    new Promise((resolve) => {
      const title = $("title").text();

      const description = $("meta[name='description']").attr("content");
      const icon = $("link[rel='icon']").attr("href");

      const shortcutIcon = $("link[rel='shortcut icon']").attr("href");
      const ogSiteName = $("meta[property='og:site_name']").attr("content");
      const ogDescription = $("meta[property='og:description']").attr(
        "content"
      );
      const ogImage = $("meta[property='og:image']").attr("content");
      const themeColor = $("meta[name='theme-color']").attr("content");

      const response = {
        title: ogSiteName ? ogSiteName : title ? title : null,
        description: ogDescription || description || null,
        icon: ogImage || icon || shortcutIcon || null,
        themeColor: themeColor || null,
      };
      resolve(response);
    });

  return extract;
})();
