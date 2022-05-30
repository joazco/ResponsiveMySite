import { createContext } from "react";
import { NotificationType } from "../../../types";

interface NotificationContextInterface {
  notification: NotificationType | null;
  setNotification: (notification: NotificationType | null) => void;
}

const NotificationContext = createContext<NotificationContextInterface>({
  notification: null,
  setNotification: () => {},
});

export default NotificationContext;
