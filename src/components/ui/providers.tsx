import { KindeProvider } from "@kinde-oss/kinde-auth-react";
import type { ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "../../store";

interface ProvidersProps {
  children?: ReactNode;
}
const Providers = ({ children }: ProvidersProps) => {
  return (
    <KindeProvider
      clientId="8214457559424564bb55e86f2e35a43c"
      domain="https://rehandev.kinde.com"
      redirectUri="http://localhost:5173/dashboard"
      logoutUri="http://localhost:5173"
      useInsecureForRefreshToken={true}
    >
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <BrowserRouter>{children}</BrowserRouter>
        </PersistGate>
      </Provider>
    </KindeProvider>
  );
};

export default Providers;
