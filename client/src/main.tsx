/* Electric Blueprint hydration: enhance pre-rendered HTML; create an empty app only as a development fallback. */
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const root = document.getElementById("root");

if (!root) {
  throw new Error("AI Leverage Lab root element was not found.");
}

if (root.hasChildNodes()) {
  hydrateRoot(root, <App />);
} else {
  createRoot(root).render(<App />);
}
