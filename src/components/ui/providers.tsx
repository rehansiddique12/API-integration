import { KindeProvider } from "@kinde-oss/kinde-auth-react";
import type { ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "../../store";
import { ThemeProvider } from "../theme-provider";
import { SidebarProvider } from "./sidebar";
import { Toaster } from "sonner";

interface ProvidersProps {
  children?: ReactNode;
}
const Providers = ({ children }: ProvidersProps) => {
  return (
    <KindeProvider
      clientId="8214457559424564bb55e86f2e35a43c"
      domain="https://rehandev.kinde.com"
      redirectUri="https://redux-toolkit-react-ts.vercel.app/dashboard"
      logoutUri="https://redux-toolkit-react-ts.vercel.app"
      useInsecureForRefreshToken={true}
    >
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <BrowserRouter>
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
              <SidebarProvider>
                <Toaster richColors={true} duration={1500} />
                {children}
              </SidebarProvider>
            </ThemeProvider>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </KindeProvider>
  );
};

export default Providers;
