import { LoginPage } from "../Login/LoginPage";
import { TestPage } from "../TestPage";
import React from "react";

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Routes,
} from "react-router-dom";
import { Navbar } from "../Framework/Navbar/NavBar";
import { LandingPage } from "../LandingPage/LandingPage";
import { Planning } from "../Planning/Planning";

export function AppConfigRouter() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/planning" element={<Planning />} />
        <Route path="/account" element={<LoginPage />} />
        <Route path="/logout" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  );
}
