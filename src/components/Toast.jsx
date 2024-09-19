import { useEffect, useState } from "react";
import "../styles/toastStyle.css";
import { createPortal } from "react-dom";
import bus from "../services/eventBus";

const Toast = () => {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const handleToastEvent = (toast) => {
      setToasts((prevToasts) => [...prevToasts, { id: Date.now(), ...toast }]);

      setTimeout(() => {
        setToasts((prevToasts) => prevToasts.slice(1));
      }, 3000);
    };

    const unsubscribe = bus.subscribe("SHOW_TOAST", handleToastEvent);

    return () => {
      unsubscribe();
    };
  }, []);

  const positions = ["top-left", "top-right", "bottom-left", "bottom-right"];
  const groupedToasts = positions.reduce((acc, position) => {
    acc[position] = toasts.filter((toast) => toast.position === position);
    return acc;
  }, {});
  console.log(groupedToasts);
  const getAnimationClass = (position) => {
    if (position.includes("left")) {
      return "slideToLeft";
    }
    if (position.includes("right")) {
      return "slideToRight";
    }

    return "";
  };

  const getSpeedAnimationClass = (speed) => {
    if (speed) {
      return "speedy";
    }
    return "";
  };
  return createPortal(
    <>
      {positions.map((position) => (
        <div key={position} className={`toast-container ${position}`}>
          {groupedToasts[position].map((toast) => (
            <div
              key={toast.id}
              className={`toast ${toast.type} ${getAnimationClass(
                position
              )} ${getSpeedAnimationClass(toast.speed)}`}
            >
              {toast.message}
            </div>
          ))}
        </div>
      ))}
    </>,
    document.body
  );
};

export default Toast;
