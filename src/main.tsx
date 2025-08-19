import "./index.css";
import App from "./App.tsx";
import { createRoot } from "react-dom/client";
import Providers from "./components/ui/providers.tsx";

createRoot(document.getElementById("root")!).render(
 
      <Providers>
        <App />
      </Providers>
    
);
