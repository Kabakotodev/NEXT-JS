import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

/* 🔔 Toast global */
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")!).render(
  <>
    <App />

    {/* 🔔 TOASTS GLOBAUX */}
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      pauseOnHover
      draggable
      theme="colored"
    />
  </>
);
