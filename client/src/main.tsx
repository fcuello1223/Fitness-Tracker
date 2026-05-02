import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import { AppProvider } from "./context/AppContext.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <Router>
    <ThemeProvider>
      <AppProvider>
        <App />
      </AppProvider>
    </ThemeProvider>
  </Router>,
);
