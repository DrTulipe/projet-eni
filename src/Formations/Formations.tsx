import React, { useState, useEffect } from "react";

export function Formations() {
  const [formations, setFormations] = useState<any[]>([]);

  useEffect(() => {
    // Simulation d'un appel API
    // Bien sûr, dans une application réelle, vous récupérerez ceci depuis un endpoint.
    setFormations([
      {
        id: 1,
        title: "Problème de connexion",
        campus: "Rennes",
        classe: "HMS2D_012A",
        status: "En attente",
      },
      {
        id: 2,
        title: "Bug affichage",
        campus: "Nantes",
        classe: "HMS2D_012B",
        status: "Accepté",
      },
    ]);
  }, []);

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
      <h1 className="text-2xl mb-4">Mes formations</h1>
      <table className="table w-full">
        <thead>
          <tr>
            <th>Titre</th>
            <th>Campus</th>
            <th>Classe</th>
            <th>Statut</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {formations.map((formation) => (
            <tr key={formation.id}>
              <td>{formation.title}</td>
              <td>{formation.campus}</td>
              <td>{formation.classe}</td>
              <td>{formation.status}</td>
              {/* //todo : masquer les boutons si le statut est déjà renseigné */}
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
