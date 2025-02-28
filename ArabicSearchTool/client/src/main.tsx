import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import "@fontsource/noto-sans-arabic/400.css";
import "@fontsource/noto-sans-arabic/500.css";
import "@fontsource/noto-sans-arabic/700.css";

createRoot(document.getElementById("root")!).render(<App />);