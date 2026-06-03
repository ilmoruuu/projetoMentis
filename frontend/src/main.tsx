import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/tailwind.css";
import "./styles/index.css";

// Importando o App que veio do Figma.
// Atenção: se o App.tsx usar "export default", tire as chaves e deixe apenas: import App from './app/App'
import App from "./app/App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
