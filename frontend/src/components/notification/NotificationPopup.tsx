import { createPortal } from "react-dom";

export default function NotificationPopup() {
  return createPortal(
    <div className="absolute"></div>,
    document.querySelector("#root") as HTMLElement
  );
}
