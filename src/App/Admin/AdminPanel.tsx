import React, { useState, useEffect } from "react";
import {
  fetchCampus,
  createCampus,
  CampusInterface,
  EditCampusModal,
  CreateCampusModal,
  CampusListCard,
} from "./GestionCampus";
import { fetchClasses, createClass } from "./GestionClasses";
import {
  fetchFormateurs,
  createFormateur,
  CreateUtilisateurModal,
  EditUtilisateurModal,
} from "./GestionUtilisateurs";
import "./admin.css";
import Button from "../../Framework/Button";
import essentielle from "./essentielle.png";
import avancee from "./avancee.png";
import premium from "./premium.png";
import { ApiPost } from "../../Framework/useApi/useApiPost";
import { UtilisateurInterface } from "../Compte/Compte";

export function AdminPanel() {
  const [utilisateurList, setUtilisateurList] = useState<
    UtilisateurInterface[]
  >([]);
  const [classes, setClasses] = useState<any[]>([]);

  const [showModalCreateUtilisateur, setShowModalCreateUtilisateur] =
    useState<boolean>(false);
  const [showModalClasse, setShowModalClasse] = useState<boolean>(false);

  const [formateurName, setFormateurName] = useState<string>("");
  const [classeName, setClasseName] = useState<string>("");

  const handleAddFormateur = async () => {
    if (formateurName.trim() === "") {
      alert("Veuillez saisir un nom de formateur.");
      return;
    }

    await handleSubmitFormateur({ name: formateurName });
  };

  const handleAddClasse = async () => {
    if (classeName.trim() === "") {
      alert("Veuillez saisir un nom de classe.");
      return;
    }

    await handleSubmitClasse({ name: classeName });
  };

  useEffect(() => {
    async function loadData() {
      const loadedFormateurs = await fetchFormateurs();
      const loadedClasses = await fetchClasses();
      // setUtilisateurList(loadedFormateurs);
      // setClasses(loadedClasses);
    }

    loadData();
  }, []);

  const handleSubmitFormateur = async (data: any) => {
    const newFormateur = await createFormateur(data);
    setUtilisateurList((prev) => [...prev, newFormateur]);
  };

  const handleSubmitClasse = async (data: any) => {
    const newClass = await createClass(data);
    setClasses((prev) => [...prev, newClass]);
  };

  const [utilisateurSelected, setUtilisateurSelected] = useState<
    UtilisateurInterface | undefined
  >(undefined);
  const [isModalUtilisateurOpen, setIsModalUtilisateurOpen] =
    useState<boolean>(false);

  const handleModifierUtilisateur = (utilisateur: UtilisateurInterface) => {
    if (!utilisateur) return;
    setUtilisateurSelected(utilisateur);
    setIsModalUtilisateurOpen(true);
  };

  const handleSupprimerUtilisateur = (id?: number) => {
    if (!id) return;
    if (!window.confirm("êtes vous sur de vouloir supprimer cet utilisateur ?"))
      return;
    setUtilisateurList(
      utilisateurList.filter((formateur) => formateur.id !== id)
    );
    ApiPost("/api/utilisateur/delete", id);
    // todo appel api pour supprimer l'utilisateur
  };

  const handleModifierClasse = (id: number) => {
    setClasses(classes.filter((formateur) => formateur.id !== id));
    // todo modal de modification
  };

  const handleSupprimerClasse = (id: number) => {
    setClasses(classes.filter((formateur) => formateur.id !== id));
    // todo appel api pour supprimer la classe
  };

  const openModalCreateClasse = () => setShowModalClasse(true);
  const closeModalCreateClasse = () => setShowModalClasse(false);

  return (
    <div>
      <div className="admin-container">
        <h1>
          <b>Panneau Administrateur</b>
        </h1>
        <div className="admin-panel">
          <div className="card">
            <div className="card-header">
              <h2>Gestion des Utilisateurs</h2>
              <Button
                onClick={() => {
                  /* code pour ajouter un formateur */
                  setShowModalCreateUtilisateur(true);
                }}
              >
                Ajouter un utilisateur
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
                  {utilisateurList.map((utilisateur) => (
                    <tr key={utilisateur.id}>
                      <td>{utilisateur.nom}</td>
                      <td>
                        <button
                          className="btn btn-outline btn-accent"
                          onClick={() => handleModifierUtilisateur(utilisateur)}
                        >
                          Enregistrer
                        </button>
                        <button
                          className="btn btn-outline btn-error"
                          onClick={() =>
                            handleSupprimerUtilisateur(utilisateur.id)
                          }
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
                          Enregistrer
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

          <CampusListCard />
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

      {utilisateurSelected && (
        <EditUtilisateurModal
          isModalUtilisateurOpen={isModalUtilisateurOpen}
          setIsModalUtilisateurOpen={setIsModalUtilisateurOpen}
          utilisateurSelected={utilisateurSelected}
        />
      )}
      <CreateUtilisateurModal
        setShowModalCreateUtilisateur={setShowModalCreateUtilisateur}
        showModalCreateUtilisateur={showModalCreateUtilisateur}
      />
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
                  value={formateurName}
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
