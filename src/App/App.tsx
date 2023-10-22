import { BrowserRouter } from "react-router-dom";
import "./input.css";
import { AppConfigRouter } from "./Router/AppConfigRouter";

export function App() {
  return (
    <BrowserRouter>
      <AppConfigRouter />
    </BrowserRouter>
  );
}
