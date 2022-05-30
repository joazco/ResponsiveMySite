const admin = require("firebase-admin");
const utils = require("../utils");

module.exports = (() => {
  const saveCode = (appId) => {
    return new Promise((resolve) => {
      const docId = admin.firestore().collection("apps").doc("id");
      const docApp = admin.firestore().collection("apps").doc(appId);
      docId.get().then((snapshot) => {
        const { id } = snapshot.data();
        const newId = Number(id) + 1;
        docId.set({ id: newId }).then(() => {
          docApp.get().then((snapshot) => {
            const data = snapshot.data();
            if (!data) {
              response.send({ error: "fail find data" });
            }
            docApp.set({ ...data, code: newId }).then(() => resolve(newId));
          });
        });
      });
    });
  };

  const checkHeader = (request, response) => {
    const origin = request.header("origin");
    if (
      request.header("authorization") !== utils.publicApiKey ||
      !origin ||
      !utils.isLink(origin) ||
      origin.includes("localhost")
    ) {
      response.send("ok");
      return false;
    }
    return true;
  };
  const checkHaveRequired = (query) => {
    const check = () => {
      const { url, name, themeColor, icon, orientation, openExternalUrl } =
        query;
      if (!utils.isLink(url) || url.includes("localhost")) return false;
      if (!name || name === null || name.trim() === "") return false;
      if (!utils.transformColor(themeColor)) return false;
      if (utils.isLinkImage(icon) !== true) return false;
      if (
        !orientation ||
        !(
          Number(orientation) === 5 ||
          Number(orientation) === 2 ||
          Number(orientation) === 1
        )
      )
        return false;
      if (
        !openExternalUrl ||
        !(
          openExternalUrl === "self" ||
          openExternalUrl === "system" ||
          openExternalUrl === "sameDomain"
        )
      )
        return false;
      return true;
    };
    return new Promise((resolve, reject) => {
      if (!check()) {
        reject();
      } else {
        resolve();
      }
    });
  };
  const checkStatusBar = (query) => {
    const { statusBar, statusBarBackgroundColor, statusBarStyle } = query;

    const check = () => {
      if (
        !statusBarBackgroundColor ||
        !utils.transformColor(statusBarBackgroundColor)
      )
        return false;
      if (
        statusBarStyle &&
        !(statusBarStyle === "light" || statusBarStyle === "dark")
      )
        return false;
      return true;
    };
    return new Promise((resolve, reject) => {
      if (typeof statusBar === "undefined") {
        resolve();
      } else if (!check()) {
        reject();
      } else {
        resolve();
      }
    });
  };

  const checkSplashScreen = (query) => {
    const {
      splashScreen,
      splashScreenBackgroundColor,
      splashScreenDelay,
      spinner,
      spinnerColor,
      spinnerSize,
    } = query;
    const check = () => {
      if (
        !splashScreenBackgroundColor ||
        !utils.transformColor(splashScreenBackgroundColor)
      )
        return false;
      if (!splashScreenDelay || Number.isNaN(Number(splashScreenDelay)))
        return false;
      if (typeof spinner !== "undefined") {
        if (!spinnerColor || !utils.transformColor(spinnerColor)) return false;
        if (!(spinnerSize === "small" || spinnerSize === "large")) return false;
      }
      return true;
    };

    return new Promise((resolve, reject) => {
      if (typeof splashScreen === "undefined") {
        resolve();
      } else if (!check()) {
        reject();
      } else {
        resolve();
      }
    });
  };

  const checkUpdate = (request) => {
    return new Promise((resolve, reject) => {
      const {
        headers: { origin },
        query,
      } = request;
      const { id, code } = query;
      admin
        .firestore()
        .collection("apps")
        .doc(id)
        .get()
        .then((snapshot) => {
          const data = snapshot.data();
          if (!data || data.code !== Number(code) || data.uid !== origin) {
            reject();
          } else {
            resolve();
          }
        })
        .catch(reject);
    });
  };

  const checkAll = (query) =>
    Promise.all([
      checkHaveRequired(query),
      checkStatusBar(query),
      checkSplashScreen(query),
    ]);

  const formatData = (request) => {
    const {
      headers: { origin },
      query,
    } = request;
    const {
      url,
      name,
      themeColor,
      icon,
      orientation,
      openExternalUrl,
      statusBar,
      statusBarBackgroundColor,
      statusBarStyle,
      splashScreen,
      splashScreenBackgroundColor,
      splashScreenDelay,
      spinner,
      spinnerColor,
      spinnerSize,
      code,
      geolocation,
      notificationPush,
      ...rest
    } = query;
    const data = {
      ...rest,
      uid: origin,
      url,
      name,
      orientation: Number(orientation),
      openExternalUrl,
      themeColor: utils.transformColor(themeColor),
      icon,
      geolocation: Number(geolocation) === 1,
      notificationPush: Number(notificationPush) === 1,
    };
    if (statusBar) {
      data.statusBar = {
        backgroundColor: statusBarBackgroundColor,
      };
      if (statusBarStyle) {
        data.statusBar.style = statusBarStyle;
      }
    }
    if (splashScreen) {
      data.splashScreen = {
        backgroundColor: splashScreenBackgroundColor || themeColor,
        delay: splashScreenDelay || "1.5",
      };
      if (spinner) {
        data.splashScreen.spinner = {
          color: spinnerColor,
          size: spinnerSize,
        };
      }
    }
    if (code) {
      data.code = Number(code);
    }

    return data;
  };

  const create = (request, response) => {
    if (!checkHeader(request, response)) {
      return;
    }
    const { query } = request;

    checkAll(query)
      .then(() => {
        const data = formatData(request);
        admin
          .firestore()
          .collection("apps")
          .add(data)
          .then((snapshot) => {
            const id = snapshot.id;
            saveCode(id).then((code) => {
              response.send({ ...data, id, code });
            });
          });
      })
      .catch(() => {
        response.send("data fails");
      });
  };

  const update = (request, response) => {
    if (!checkHeader(request, response)) {
      return;
    }
    const { query } = request;

    Promise.all([checkAll(query), checkUpdate(request)])
      .then(() => {
        const data = formatData(request);
        admin
          .firestore()
          .collection("apps")
          .doc(data.id)
          .set(data)
          .then(() => {
            response.send(data);
          });
      })
      .catch(() => response.send("data fails"));
  };

  const deleteWebApp = (request, response) => {
    if (!checkHeader(request, response)) {
      return;
    }
    const { query } = request;

    checkUpdate(request)
      .then(() => {
        const { id } = query;
        admin
          .firestore()
          .collection("apps")
          .doc(id)
          .delete()
          .then(() => response.send("ok"));
      })
      .catch(() => response.send("data fails"));
  };

  return {
    create,
    saveCode,
    update,
    deleteWebApp,
  };
})();
