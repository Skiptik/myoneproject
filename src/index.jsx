import "bootstrap/dist/css/bootstrap.min.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AuthProvider } from "./components/Auth/ContextApiAuth";
import App from "./components/App/App";
import { BrowserRouter } from "react-router-dom";
import "./styles/global/global.scss";
import "./styles/global/fonts.scss";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
