const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors")({ origin: true });
const axios = require("axios");
const cheerio = require("cheerio");
const dataFromUrl = require("./modules/dataFromUrl");
const dataFromManifest = require("./modules/dataFromManifest");
const mergeData = require("./modules/mergeData");
const iaFindData = require("./modules/iaFindData");
const formatDataWebSite = require("./modules/formatDataWebSite");
const webApp = require("./modules/webApp");

const defaultWebSiteInfo = {
  title: "",
  description: null,
  icon: null,
  themeColor: null,
};
admin.initializeApp();

exports.webSiteInfo = functions.https.onRequest((request, response) => {
  // Enable CORS using the `cors` express middleware.
  cors(request, response, () => {
    const query = request.query;
    const url = query.url;
    if (!url) {
      response.send({ error: "url not found" });
      return;
    }

    axios
      .get(url)
      .then((res) => {
        const $ = cheerio.load(res.data);
        const manifest = $("link[rel='manifest']").attr("href");
        Promise.all([dataFromUrl($), dataFromManifest(url, manifest)])
          .then(mergeData)
          .then((finalData) => {
            if (finalData.title === null || finalData.icon === null) {
              iaFindData($, finalData).then((newFinalData) =>
                response.send(formatDataWebSite(newFinalData))
              );
            } else {
              response.send(formatDataWebSite(finalData));
            }
          })
          .catch(() => response.send(defaultWebSiteInfo));
      })
      .catch(() => response.send({ error: "fail to fetch" }));
  });
});

exports.saveCode = functions.https.onRequest((request, response) => {
  // Enable CORS using the `cors` express middleware.
  cors(request, response, () => {
    const query = request.query;
    const appId = query.appId;
    if (!appId) {
      response.send({ error: "appId not found" });
      return;
    }
    webApp.saveCode(appId).then((newId) =>
      response.send({
        code: newId,
      })
    );
  });
});

exports.sendMail = functions.https.onRequest((request, response) => {
  // Enable CORS using the `cors` express middleware.
  cors(request, response, () => {
    const query = request.query;
    const {
      appName,
      appCode,
      email,
      phoneNumber,
      choiceContact,
      message,
      informationTest,
    } = query;

    admin
      .firestore()
      .collection("mail")
      .add({
        to: "jazoulay@joazco.com",
        message: {
          subject: `Création de l'app ${appName} - ${appCode}`,
          text: `
email: ${email}
phoneNumber: ${phoneNumber}
choiceContact: ${choiceContact}

message: ${message}

informationTest: ${informationTest}
          `,
        },
      })
      .then(() => response.send({ finish: "ok" }))
      .catch(() => response.send({ finish: "ko" }));
  });
});

exports.createWebApp = functions.https.onRequest((request, response) => {
  // Enable CORS using the `cors` express middleware.
  cors(request, response, () => {
    webApp.create(request, response);
  });
});

exports.updateWebApp = functions.https.onRequest((request, response) => {
  // Enable CORS using the `cors` express middleware.
  cors(request, response, () => {
    webApp.update(request, response);
  });
});

exports.deleteWebApp = functions.https.onRequest((request, response) => {
  // Enable CORS using the `cors` express middleware.
  cors(request, response, () => {
    webApp.deleteWebApp(request, response);
  });
});
