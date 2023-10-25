import { BrowserRouter } from "react-router-dom";
import "./input.css";
import { AppConfigRouter } from "./Router/AppConfigRouter";
import { LoadingProvider } from "../Framework/LoaderOverlay";

export function App() {
  return (
    <BrowserRouter>
      <LoadingProvider>
        <AppConfigRouter />
      </LoadingProvider>
    </BrowserRouter>
  );
}
