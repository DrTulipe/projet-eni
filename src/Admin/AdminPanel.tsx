import React, { useState, useEffect } from "react";
import { fetchCampus, createCampus } from "./GestionCampus";
import { fetchClasses, createClass } from "./GestionClasses";
import { fetchFormateurs, createFormateur } from "./GestionFormateurs";
import "./admin.css";
import Button from "../Framework/Button";
import essentielle from "./essentielle.png";
import avancee from "./avancee.png";
import premium from "./premium.png";

export function AdminPanel() {
  const [formateurs, setFormateurs] = useState<any[]>([]);
  const [classes, setClasses] = useState<any[]>([]);
  const [campus, setCampus] = useState<any[]>([]);
  const [showModalCampus, setShowModalCampus] = useState<boolean>(false);
  const [showModalFormateur, setShowModalFormateur] = useState<boolean>(false);
  const [showModalClasse, setShowModalClasse] = useState<boolean>(false);

  const [campusName, setCampusName] = useState<string>("");
  const [formateurName, setFormateurName] = useState<string>("");
  const [classeName, setClasseName] = useState<string>("");

  // Fonctions pour ouvrir et fermer la modale de création d'un campus
  const openModalCreateCampus = () => setShowModalCampus(true);
  const closeModalCreateCampus = () => setShowModalCampus(false);
  const openModalCreateFormateur = () => setShowModalFormateur(true);
  const closeModalCreateFormateur = () => setShowModalFormateur(false);
  const openModalCreateClasse = () => setShowModalClasse(true);
  const closeModalCreateClasse = () => setShowModalClasse(false);

  const handleAddCampus = async () => {
    if (campusName.trim() === "") {
      alert("Veuillez saisir un nom de campus.");
      return;
    }

    await handleSubmitCampus({ name: campusName });
  };

  const handleAddFormateur = async () => {
    if (campusName.trim() === "") {
      alert("Veuillez saisir un nom de formateur.");
      return;
    }

    await handleSubmitFormateur({ name: campusName });
  };

  const handleAddClasse = async () => {
    if (campusName.trim() === "") {
      alert("Veuillez saisir un nom de classe.");
      return;
    }

    await handleSubmitClasse({ name: campusName });
  };

  useEffect(() => {
    async function loadData() {
      const loadedFormateurs = await fetchFormateurs();
      const loadedClasses = await fetchClasses();
      const loadedCampus = await fetchCampus();

      setFormateurs(loadedFormateurs);
      setClasses(loadedClasses);
      setCampus(loadedCampus);
    }

    loadData();
  }, []);

  const handleSubmitFormateur = async (data: any) => {
    const newFormateur = await createFormateur(data);
    setFormateurs((prev) => [...prev, newFormateur]);
  };

  const handleSubmitClasse = async (data: any) => {
    const newClass = await createClass(data);
    setClasses((prev) => [...prev, newClass]);
  };

  const handleSubmitCampus = async (data: any) => {
    const newCampus = await createCampus(data);
    if (!newCampus) {
      alert("Un erreur est survenue lors de la création");
      return;
    }
    setCampus((prev) => [...prev, newCampus]);
    closeModalCreateCampus();
    setCampusName("");
  };

  const handleModifierFormateur = (id: number) => {
    setFormateurs(formateurs.filter((formateur) => formateur.id !== id));
    // todo modal de modification
  };

  const handleSupprimerFormateur = (id: number) => {
    setFormateurs(formateurs.filter((formateur) => formateur.id !== id));
    // todo appel api pour supprimer le formateur
  };

  const handleModifierClasse = (id: number) => {
    setFormateurs(classes.filter((formateur) => formateur.id !== id));
    // todo modal de modification
  };

  const handleSupprimerClasse = (id: number) => {
    setFormateurs(classes.filter((formateur) => formateur.id !== id));
    // todo appel api pour supprimer le formateur
  };

  const handleModifierCampus = (id: number) => {
    setFormateurs(campus.filter((campus) => campus.id !== id));
    // todo modal de modification
  };

  const handleSupprimerCampus = (id: number) => {
    setFormateurs(campus.filter((campus) => campus.id !== id));
    // todo appel api pour supprimer le formateur
  };

  return (
    <div>
      <div className="admin-container">
        <h1>
          <b>Panneau Administrateur</b>
        </h1>
        <div className="admin-panel">
          <div className="card">
            <div className="card-header">
              <h2>Gestion des Formateurs</h2>
              <Button
                onClick={() => {
                  /* code pour ajouter un formateur */
                  openModalCreateFormateur();
                }}
              >
                Ajouter un formateur
              </Button>
            </div>
            <div className="card-content">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>Nom</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {formateurs.map((formateur) => (
                    <tr key={formateur.id}>
                      <td>{formateur.nom}</td>
                      <td>
                        <button
                          className="btn btn-outline btn-accent"
                          onClick={() => handleModifierFormateur(formateur.id)}
                        >
                          Modifier
                        </button>
                        <button
                          className="btn btn-outline btn-error"
                          onClick={() => handleSupprimerFormateur(formateur.id)}
                        >
                          Supprimer
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h2>Gestion des Classes</h2>
              <Button
                onClick={() => {
                  /* code pour ajouter une classe */
                  openModalCreateClasse();
                }}
              >
                Ajouter une classe
              </Button>
            </div>
            <div className="card-content">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>Nom</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {classes.map((classe) => (
                    <tr key={classe.id}>
                      <td>{classe.nom}</td>
                      <td>
                        <button
                          className="btn btn-outline btn-accent"
                          onClick={() => handleModifierClasse(classe.id)}
                        >
                          Modifier
                        </button>
                        <button
                          className="btn btn-outline btn-error"
                          onClick={() => handleSupprimerClasse(classe.id)}
                        >
                          Supprimer
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h2>Gestion des Campus</h2>
              <Button
                onClick={() => {
                  openModalCreateCampus();
                }}
              >
                Ajouter un campus
              </Button>
            </div>
            <div className="card-content">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>Nom</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {campus.map((campus) => (
                    <div key={campus.id}>
                      <tr key={campus.id}>
                        <td>{campus.nom}</td>
                        <td>
                          <button
                            className="btn btn-outline btn-accent"
                            onClick={() => handleModifierCampus(campus.id)}
                          >
                            Modifier
                          </button>
                          <button
                            className="btn btn-outline btn-error"
                            onClick={() => handleSupprimerCampus(campus.id)}
                          >
                            Supprimer
                          </button>
                        </td>
                      </tr>
                    </div>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <h2>Gestion des Abonnements</h2>
            </div>
            <div className="card-content flex justify-between">
              {/* Abonnement 1 */}
              <div className="subscription">
                <img src={essentielle} alt="Essentielle" />
                <button className="subscribe-btn">Souscrire</button>
              </div>

              {/* Abonnement 2 */}
              <div className="subscription">
                <img src={avancee} alt="Avancée" />
                <button className="subscribe-btn">Souscrire</button>
              </div>

              {/* Abonnement 3 */}
              <div className="subscription">
                <img src={premium} alt="Premium" />
                <button className="subscribe-btn">Souscrire</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showModalCampus && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="modal modal-open">
            <div className="modal-box">
              <h2 className="text-xl">Ajouter un Campus</h2>
              <div className="mb-4">
                <label
                  className="block text-sm font-medium mb-2"
                  htmlFor="event-title"
                >
                  Nom du Campus
                </label>
                <input
                  type="text"
                  id="campus-name"
                  value={campusName}
                  onChange={(e) => setCampusName(e.target.value)}
                  className="border p-2 w-full"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={closeModalCreateCampus}
                  className="btn btn-outline mr-2"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={handleAddCampus}
                >
                  Ajouter
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showModalFormateur && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="modal modal-open">
            <div className="modal-box">
              <h2 className="text-xl">Ajouter un Formateur</h2>
              <div className="mb-4">
                <label
                  className="block text-sm font-medium mb-2"
                  htmlFor="event-title"
                >
                  Nom du Formateur
                </label>
                <input
                  type="text"
                  id="formateur-name"
                  value={campusName}
                  onChange={(e) => setFormateurName(e.target.value)}
                  className="border p-2 w-full"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={closeModalCreateFormateur}
                  className="btn btn-outline mr-2"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={handleAddFormateur}
                >
                  Ajouter
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showModalClasse && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="modal modal-open">
            <div className="modal-box">
              <h2 className="text-xl">Ajouter une classe</h2>
              <div className="mb-4">
                <label
                  className="block text-sm font-medium mb-2"
                  htmlFor="event-title"
                >
                  Nom de la classe
                </label>
                <input
                  type="text"
                  id="formateur-name"
                  value={campusName}
                  onChange={(e) => setClasseName(e.target.value)}
                  className="border p-2 w-full"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={closeModalCreateClasse}
                  className="btn btn-outline mr-2"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={handleAddClasse}
                >
                  Ajouter
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
