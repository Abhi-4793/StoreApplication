// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import "./index.css";
import App from "./App.tsx";
import { AppProvider } from "./context/fetchDataContext.tsx";
import { SearchProvider } from "./context/SearchBarContext.tsx";
createRoot(document.getElementById("root")!).render(
  <SearchProvider>
    <AppProvider>
      <App />
    </AppProvider>
  </SearchProvider>
);
