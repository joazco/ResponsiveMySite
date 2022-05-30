import React, { useMemo, useCallback } from "react";
import {
  getFirestore,
  doc,
  addDoc,
  collection,
  updateDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
// import { getStorage, ref, uploadString } from "firebase/storage";
// import * as FileSystem from "expo-file-system";

import { WebAppFirebase } from "../../../types";
// import { getTypeImage } from "../../../utils";

const useFirebase = () => {
  const db = useMemo(() => getFirestore(), []);
  // const storage = useMemo(() => getStorage(), []);

  const getVersion = useCallback(
    () => getDoc(doc(db, "versions", "current")),
    []
  );

  const addWebApp = useCallback(
    (app: Partial<WebAppFirebase>): Promise<WebAppFirebase> =>
      new Promise((resolve, reject) => {
        addDoc(collection(db, "apps"), app)
          .then((docRef) => {
            const newApp = { ...app, id: docRef.id } as WebAppFirebase;
            updateWebApp(newApp)
              .then(() => resolve(newApp))
              .catch(reject);
          })
          .catch(reject);
      }),
    []
  );

  const updateWebApp = useCallback(
    (app: WebAppFirebase) => updateDoc(doc(db, "apps", app.id), app),
    []
  );

  const getApps = useCallback(
    (codes: number[]): Promise<WebAppFirebase[]> =>
      new Promise((resolve, reject) => {
        const appsRef = collection(db, "apps");

        // Create a query against the collection.
        const q = query(appsRef, where("code", "in", codes));

        getDocs(q)
          .then((querySnapshot) => {
            const data: WebAppFirebase[] = [];
            querySnapshot.forEach((doc) => {
              data.push(doc.data() as WebAppFirebase);
            });
            resolve(data);
          })
          .catch((err) => {
            console.log(err);
            reject();
          });
      }),
    []
  );

  const getApp = useCallback(
    (code: number): Promise<WebAppFirebase | null> =>
      new Promise((resolve, reject) => {
        const appsRef = collection(db, "apps");
        // Create a query against the collection.
        const q = query(appsRef, where("code", "==", code));

        getDocs(q)
          .then((querySnapshot) => {
            const data: WebAppFirebase[] = [];
            querySnapshot.forEach((doc) => {
              data.push(doc.data() as WebAppFirebase);
            });
            if (data.length === 0) {
              resolve(null);
            } else {
              resolve(data[0]);
            }
          })
          .catch(reject);
      }),
    []
  );

  const removeApp = useCallback(
    (id: string) => deleteDoc(doc(db, "apps", id)),
    []
  );

  const uploadFile = useCallback(
    (app: WebAppFirebase): Promise<WebAppFirebase> =>
      new Promise((resolve, reject) => {
        const { icon, uid, name } = app;
        if (icon === null || !icon.startsWith("file:///")) {
          resolve(app);
          return;
        }
        resolve(app);
        // const imageType = getTypeImage(icon);
        // const imageName = `logos/${name.trim()}${imageType}`; //`logos/${uid}/${name.trim()}${Date.now().toString()}${imageType}`;
        // const imagesRef = ref(storage, imageName);
        // console.log(imageType);
        // FileSystem.readAsStringAsync(icon, {
        //   encoding: FileSystem.EncodingType.Base64,
        // }).then((data) => {
        //   console.log(data.trim());
        //   // const dataUrl = `data:image/png;base64,${data.trim()}`;
        //   const dataUrl =
        //     "data:image/png;base64,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";
        //   uploadString(imagesRef, dataUrl, "data_url", {
        //     contentType: "image/png",
        //   })
        //     .then((snapshot) => {
        //       reject();
        //       // resolve({
        //       //   ...app,
        //       //   icon: `https://console.firebase.google.com/project/responsivemysite-17b70/storage/responsivemysite-17b70.appspot.com/files/${imageName}`,
        //       // });
        //     })
        //     .catch(() => {
        //       resolve(app);
        //     });
        // });
      }),
    []
  );

  return {
    getVersion,
    addWebApp,
    updateWebApp,
    getApps,
    getApp,
    removeApp,
    uploadFile,
  };
};

export default useFirebase;
