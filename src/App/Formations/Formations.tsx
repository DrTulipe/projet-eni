import React, { useState, useEffect } from "react";
interface FormationsListInterface {
  id: number;
  title: string;
  campus: string;
  classe: string;
  salle: string;
  dateDebut: Date;
  dateFin: Date;
  status: string;
}

export function Formations() {
  const [formations, setFormations] = useState<FormationsListInterface[]>([]);

  useEffect(() => {
    // todo : récupérer les données via un appel api
    setFormations([
      {
        id: 1,
        title: "Formation Agile",
        campus: "Rennes",
        classe: "HMS2D_012A",
        salle: "F1",
        dateDebut: new Date(),
        dateFin: new Date(),
        status: "En attente",
      },
      {
        id: 2,
        title: "Formation iso 9001",
        campus: "Nantes",
        classe: "HMS2D_012B",
        salle: "F2",
        dateDebut: new Date(),
        dateFin: new Date(),
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
            <th>Salle</th>
            <th>Statut</th>
            <th>Date Début</th>
            <th>Date Fin</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {formations.map((formation) => (
            <tr key={formation.id}>
              <td>{formation.title}</td>
              <td>{formation.campus}</td>
              <td>{formation.classe}</td>
              <td>{formation.salle}</td>
              <td>{formation.status}</td>
              <td>{formation.dateDebut.toString()}</td>
              <td>{formation.dateFin.toString()}</td>
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
