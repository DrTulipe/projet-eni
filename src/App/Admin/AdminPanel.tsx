import React, { useState, useEffect } from "react";
import {
  fetchCampus,
  createCampus,
  CampusInterface,
  EditCampusModal,
  CreateCampusModal,
  CampusListCard,
} from "./GestionCampus";
import { fetchClasses, createClass, ClasseList } from "./GestionClasses";
import {
  fetchFormateurs,
  createFormateur,
} from "../Utilisateur/GestionUtilisateurs";
import "./admin.css";
import Button from "../../Framework/Button";
import essentielle from "./essentielle.png";
import avancee from "./avancee.png";
import premium from "./premium.png";
import { ApiPost } from "../../Framework/useApi/useApiPost";
import { UtilisateurInterface } from "../Utilisateur/Compte";
import { UtilisateurList } from "../Utilisateur/UtilisateurList";
import { getUserInfo } from "../Router/AppConfigRouter";
import { BatimentListCard } from "./GestionEtablissement";
import { ModuleFormationListCard } from "./GestionCours";
import { SalleListCard } from "./GestionSalles";

export function AdminPanel() {
  const userClean = getUserInfo();
  return (
    <div>
      <div className="admin-container">
        <h1>
          <b>Panneau Administrateur</b>
        </h1>
        <div className="admin-panel">
          {userClean !== "" &&
            userClean?.roles &&
            userClean?.roles[0] === "ROLE_ADMIN" && <UtilisateurList />}
          <ClasseList />
          {userClean !== "" &&
            userClean?.roles &&
            userClean?.roles[0] === "ROLE_ADMIN" && (
              <>
                <CampusListCard />
                <BatimentListCard />
              </>
            )}
            <ModuleFormationListCard />
            <SalleListCard />
          {/* <div className="card">
            <div className="card-header">
              <h2>Gestion des Abonnements</h2>
            </div>
            <div className="card-content flex justify-between">
              <div className="subscription">
                <img src={essentielle} alt="Essentielle" />
                <button className="subscribe-btn">Souscrire</button>
              </div>

              <div className="subscription">
                <img src={avancee} alt="Avancée" />
                <button className="subscribe-btn">Souscrire</button>
              </div>

              <div className="subscription">
                <img src={premium} alt="Premium" />
                <button className="subscribe-btn">Souscrire</button>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
