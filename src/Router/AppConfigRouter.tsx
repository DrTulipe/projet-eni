import { LoginPage, useCheckConnection } from "../Login/LoginPage";
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
import { Compte } from "../Compte/Compte";
import { Formations } from "../Formations/Formations";
import { AdminPanel } from "../Admin/AdminPanel";
export function AppConfigRouter() {
  const isLogged = localStorage.getItem("isLogged");
  useCheckConnection();
  console.log(isLogged);
  return (
    <>
      <Navbar />
      <Routes>
        {isLogged === "true" ? (
          <>
            <Route path="/" element={<LandingPage />} />
            <Route path="/planning" element={<Planning />} />
            <Route path="/account" element={<LoginPage />} />
            <Route path="/compte" element={<Compte />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/formations" element={<Formations />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/logout" element={<LoginPage />} />
          </>
        ) : (
          <>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
          </>
        )}
      </Routes>
    </>
  );
}
