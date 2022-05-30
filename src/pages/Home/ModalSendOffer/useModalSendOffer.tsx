import { useCallback, useContext, useState } from "react";
import { ModalSendOfferProps } from ".";
import AppContext from "../../../../AppContext";
import { isEmail } from "../../../../utils";
import { NotificationContext } from "../../../components";
import { useDatabase, useRest } from "../../../hooks";

const useModalSendOffer = ({
  app,
  onRequestClose,
}: Omit<ModalSendOfferProps, "visible">) => {
  const { fetchSendMail } = useRest();
  const { setItem } = useDatabase();
  const { setNotification } = useContext(NotificationContext);
  const { codesOfferSended, setCodesOfferSended } = useContext(AppContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [choiceContact, setChoiceContact] = useState<"email" | "phone">(
    "email"
  );
  const [message, setMessage] = useState<string>("");
  const [informationTest, setInformationTest] = useState<string>("");

  const formIsValid = useCallback(
    () => isEmail(email) && phoneNumber.length >= 10 && loading === false,
    [email, phoneNumber, loading]
  );

  const saveCode = useCallback(() => {
    if (app === null) return;
    const newCodes = Array.from(codesOfferSended.concat(app.code));
    setItem("codesOffer", newCodes);
    setCodesOfferSended(newCodes);
  }, [app]);

  const onSubmit = () => {
    if (app === null) return;
    setLoading(true);
    fetchSendMail({
      appName: app.name,
      appCode: app.code.toString(),
      email,
      phoneNumber,
      choiceContact,
      message,
      informationTest,
    })
      .then((res) => {
        const { finish } = res;
        if (finish === "ok") {
          setNotification({
            content: "Le message a été envoyé",
            type: "success",
          });
          saveCode();
          onRequestClose();
        } else {
          setNotification({
            content: "Une erreur est survenue",
            type: "error",
          });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return {
    email,
    phoneNumber,
    choiceContact,
    message,
    informationTest,
    setEmail,
    setPhoneNumber,
    setChoiceContact,
    setMessage,
    setInformationTest,
    formIsValid,
    onSubmit,
  };
};

export default useModalSendOffer;
