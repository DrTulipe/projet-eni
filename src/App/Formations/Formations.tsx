import React, { useState, useEffect } from "react";
import { EvenementInterface } from "../Planning/Planning";
import { ApiGet } from "../../Framework/useApi/useApiGet";

export function Formations() {
  const [formations, setFormations] = useState<EvenementInterface[]>([]);
  const [refreshCount, setRefreshCount] = useState(0);

  useEffect(() => {
    const fetchEvents = async () => {
      const result = await ApiGet("/api/sessions");
      if(result === "ERROR") return;
      setFormations(result);
    };
    fetchEvents();
  }, [refreshCount]);

  const handleRefresh = () => {
    setRefreshCount((prev) => prev + 1);
  };

  const handleRefuserFormation = (id: number) => {
    setFormations(formations.filter((formation) => formation.id !== id));
    // todo appel api pour enregistrer le statut refusé
  };

  const handleAccepterFormation = (id: number) => {
    setFormations(formations.filter((formation) => formation.id !== id));
    // todo appel api pour enregistrer le statut accepté
  };

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
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {formations && formations.map((formation) => (
            <tr key={formation.id}>
              <td>{formation.moduleFormation.libelle}</td>
              <td>{formation.utilisateur.nom + " " + formation.utilisateur.prenom}</td>
              <td>{formation.classe.libelle}</td>
              <td>{formation.salle.libelle}</td>
              <td>{formation.dateDebut.toString()}</td>
              <td>{formation.dateFin.toString()}</td>
              {/* //todo : masquer les boutons si le statut est déjà renseigné */}
              {/* {formation.statut.id === 6 && ( */}
              { (
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
