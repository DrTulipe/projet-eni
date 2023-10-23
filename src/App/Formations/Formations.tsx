import React, { useState, useEffect } from "react";
import { EvenementInterface } from "../Planning/Planning";
import { ApiGet } from "../../Framework/useApi/useApiGet";
import { getUserInfo } from "../Router/AppConfigRouter";
import { ApiPatch } from "../../Framework/useApi/ApiPatch";
import { formatDate } from "../../Framework/Date/parseDateToFR";

export function Formations() {
  const userClean = getUserInfo();
  const [formations, setFormations] = useState<EvenementInterface[]>([]);
  const [refreshCount, setRefreshCount] = useState(0);

  useEffect(() => {
    const fetchEvents = async () => {
      const result = await ApiGet(
        "/api/sessions/filtres?utilisateurId=" +
          (userClean !== "" ? userClean.id : "")
      );
      if (result === "ERROR") return;
      setFormations(result);
    };
    fetchEvents();
  }, [refreshCount]);

  const handleRefresh = () => {
    setRefreshCount((prev) => prev + 1);
  };

  const handleRefuserFormation = (id: number) => {
    ApiPatch(
      "/api/sessions/" + id + "/utilisateur/" + userClean.id + "/choix?choix=0"
    );
    handleRefresh();
  };

  const handleAccepterFormation = (id: number) => {
    ApiPatch(
      "/api/sessions/" + id + "/utilisateur/" + userClean.id + "/choix?choix=1"
    );
    handleRefresh();
  };
console.log(formations)
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl mb-4">
        Mes formations &nbsp;&nbsp;&nbsp;&nbsp;
        <button onClick={handleRefresh} className="btn btn-outline mb-4">
          Rafraîchir
        </button>
      </h1>
      <table className="table w-full">
        <thead>
          <tr>
            <th>Libellé</th>
            <th>Formateur</th>
            <th>Classe</th>
            <th>Salle</th>
            <th>Date Début</th>
            <th>Date Fin</th>
            <th>Statut</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {formations &&
            formations.map((formation) => (
              <tr key={formation.id}>
                <td>{formation.moduleFormation.libelle}</td>
                <td>
                  {formation.utilisateur.nom +
                    " " +
                    formation.utilisateur.prenom}
                </td>
                <td>{formation.classe.libelle}</td>
                <td>{formation.salle.libelle}</td>
                <td>
                  {formation.dateDebut &&
                    formatDate(new Date(formation.dateDebut.toString()))}
                </td>
                <td>
                  {formation.dateFin &&
                    formatDate(new Date(formation.dateFin.toString()))}
                </td>
                <td>
                  {formation.estAcceptee === null
                    ? "En attente"
                    : formation.estAcceptee === true
                    ? "Acceptée"
                    : "Refusée"}
                </td>
                {formation.estAcceptee === null && (
                  <td>
                    <button
                      className="btn btn-outline btn-accent"
                      onClick={() => handleAccepterFormation(formation.id)}
                    >
                      Accepter
                    </button>
                    <button
                      className="btn btn-outline btn-error"
                      onClick={() => handleRefuserFormation(formation.id)}
                    >
                      Refuser
                    </button>
                  </td>
                )}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
