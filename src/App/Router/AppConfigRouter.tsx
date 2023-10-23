import { LoginPage, useCheckConnection } from "../Login/LoginPage";
import React from "react";

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Routes,
} from "react-router-dom";
import { Navbar } from "../../Framework/Navbar/NavBar";
import { LandingPage } from "../LandingPage/LandingPage";
import { Planning } from "../Planning/Planning";
import { Compte, UtilisateurInterface } from "../Utilisateur/Compte";
import { Formations } from "../Formations/Formations";
import { AdminPanel } from "../Admin/AdminPanel";
import { SupportPage } from "../Support/SupportPage";

export function getUserInfo() {
  const userBrut = localStorage.getItem("user");
  const userClean = userBrut ? JSON.parse(userBrut) : "";
  return userClean;
}

export function AppConfigRouter() {
  const isLogged = localStorage.getItem("isLogged");
  const userClean = getUserInfo();

  useCheckConnection();
  return (
    <>
      <Navbar />
      <Routes>
        {isLogged === "true" && userClean !== "" ? (
          <>
            <Route path="/" element={<LandingPage />} />
            <Route path="/planning" element={<Planning />} />
            <Route path="/account" element={<LoginPage />} />
            <Route path="/compte" element={<Compte />} />
            {  userClean?.roles && userClean?.roles[0] !== "ROLE_USER" && <Route path="/admin" element={<AdminPanel />} />}
            <Route path="/support" element={<SupportPage />} />
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
