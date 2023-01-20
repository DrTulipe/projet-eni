import { BrowserRouter, Route, Link, Router } from "react-router-dom";
import { LoginPage } from "../Login/LoginPage";
import { TestPage } from "../TestPage";

export function AppConfigRouter() {
  return (
    <>
      <Route path="/" element={<TestPage/>} />
      <Route path="/planning" element={<LoginPage />} />
      <Route path="/account" element={<LoginPage />} />
      <Route path="/logout" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
    </>
  );
}
