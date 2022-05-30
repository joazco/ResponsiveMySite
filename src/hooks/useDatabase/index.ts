import { useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useDatabase = () => {
  const setItem = useCallback(
    <T = any>(key: string, value: T): Promise<T> =>
      new Promise((resolve, reject) => {
        AsyncStorage.setItem(key, JSON.stringify(value))
          .then(() => resolve(value))
          .catch(reject);
      }),
    []
  );

  const getItem = useCallback(
    <T = any>(key: string): Promise<T> =>
      new Promise((resolve, reject) => {
        AsyncStorage.getItem(key)
          .then((data) => {
            if (data) {
              resolve(JSON.parse(data));
            } else {
              reject(new Error("no apps"));
            }
          })
          .catch(reject);
      }),
    []
  );

  return {
    setItem,
    getItem,
  };
};

export default useDatabase;
