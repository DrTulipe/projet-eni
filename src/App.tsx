import { BrowserRouter } from "react-router-dom";
import "./input.css";
import { AppConfigRouter } from "./Router/AppConfigRouter";
import { TestPage } from "./TestPage";

export function App() {
  return (
    <BrowserRouter>
      <AppConfigRouter />
    </BrowserRouter>
  );
}
