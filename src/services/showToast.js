import bus from "./eventBus";

export const showToast = (message, type, position, speed) => {
  bus.publish("SHOW_TOAST", { message, type, position, speed });
};
