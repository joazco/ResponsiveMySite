import React from "react";
import { Email } from "../../../types";

const endPoint =
  "https://us-central1-responsivemysite-17b70.cloudfunctions.net";
const webSiteInfo = `${endPoint}/webSiteInfo`;
const saveCode = `${endPoint}/saveCode`;
const sendMail = `${endPoint}/sendMail`;

const useRest = () => {
  const fetchWebSiteInfo = (url: string) =>
    fetch(`${webSiteInfo}?url=${url}`).then((res) => res.json());

  const fetchSaveCode = (appId: string) =>
    fetch(`${saveCode}?appId=${appId}`).then((res) => res.json());
  const fetchSendMail = ({
    appName,
    appCode,
    email,
    phoneNumber,
    choiceContact,
    message,
    informationTest,
  }: Email) =>
    fetch(
      `${sendMail}?appName=${appName}&appCode=${appCode}&email=${email}&phoneNumber=${phoneNumber}&choiceContact=${choiceContact}&message=${message}&informationTest=${informationTest}`
    ).then((res) => res.json());

  return { fetchWebSiteInfo, fetchSaveCode, fetchSendMail };
};

export default useRest;
