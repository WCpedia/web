import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

declare global {
  interface Window {
    kakao: any;
    naver: any;
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
