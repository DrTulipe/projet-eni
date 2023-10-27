import {
  CampusListCard,
} from "./GestionCampus";
import { ClasseList } from "./GestionClasses";
import "./admin.css";
import { UtilisateurList } from "../Utilisateur/UtilisateurList";
import { getUserInfo } from "../Router/AppConfigRouter";
import { BatimentListCard } from "./GestionBatiment";
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

        </div>
      </div>
    </div>
  );
}
