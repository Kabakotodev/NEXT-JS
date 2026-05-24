// import { toast } from 'react-toastify';

// export const notifySuccess = (message) => {
//   toast.success(message);
// };

// export const notifyError = (message) => {
//   toast.error(message);
// };

// export const notifyWarning = (message) => {
//   toast.warning(message);
// };

// export const notifyInfo = (message) => {
//   toast.info(message);
// };

// ######################### 2 #############################
import { toast } from "react-toastify";

/* 🔊 Sons */
const successSound = new Audio("/src/assets/sounds/success.mp3");
const errorSound   = new Audio("/src/assets/sounds/error.mp3");
const warningSound = new Audio("/src/assets/sounds/warning.mp3");
const infoSound    = new Audio("/src/assets/sounds/info.mp3");

/* 🔊 Fonction utilitaire */
const playSound = (audio) => {
  audio.currentTime = 0;
  audio.play().catch(() => {});
};

/* ✅ Toasts avec SON */
export const notifySuccess = (message) => {
  playSound(successSound);
  toast.success(message);
};

export const notifyError = (message) => {
  playSound(errorSound);
  toast.error(message);
};

export const notifyWarning = (message) => {
  playSound(warningSound);
  toast.warning(message);
};

export const notifyInfo = (message) => {
  playSound(infoSound);
  toast.info(message);
};
// ########################################################