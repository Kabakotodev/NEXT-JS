import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import jquery from "jquery";
const $ = jquery as any;

(window as any).$ = $;
(window as any).jQuery = $;

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import "summernote/dist/summernote-lite.css";
import "summernote/dist/summernote-lite.js";

createRoot(document.getElementById("root")!).render(<App />);
