import React, { useState, useEffect } from "react";
import {
  fetchCampus,
  createCampus,
  CampusInterface,
  EditCampusModal,
  CreateCampusModal,
} from "./GestionCampus";
import { fetchClasses, createClass } from "./GestionClasses";
import {
  fetchFormateurs,
  createFormateur,
  CreateUtilisateurModal,
  EditUtilisateurModal,
} from "./GestionUtilisateurs";
import "./admin.css";
import Button from "../Framework/Button";
import essentielle from "./essentielle.png";
import avancee from "./avancee.png";
import premium from "./premium.png";
import { ApiPost } from "../Framework/useApi/useApiPost";
import { UtilisateurInterface } from "../Compte/Compte";

export function AdminPanel() {
  const [utilisateurList, setUtilisateurList] = useState<
    UtilisateurInterface[]
  >([]);
  const [classes, setClasses] = useState<any[]>([]);
  const [campusList, setCampus] = useState<CampusInterface[]>([]);
  const [showModalCreateCampus, setShowModalCreateCampus] =
    useState<boolean>(false);
  const [showModalCreateUtilisateur, setShowModalCreateUtilisateur] =
    useState<boolean>(false);
  const [showModalClasse, setShowModalClasse] = useState<boolean>(false);

  const [campusName, setCampusName] = useState<string>("");
  const [formateurName, setFormateurName] = useState<string>("");
  const [classeName, setClasseName] = useState<string>("");

  // Fonctions pour ouvrir et fermer la modale de création d'un campus
  const openModalCreateCampus = () => setShowModalCreateCampus(true);
  const closeModalCreateCampus = () => setShowModalCreateCampus(false);
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
      const loadedCampus: CampusInterface[] = await fetchCampus();

      setUtilisateurList(loadedFormateurs);
      setClasses(loadedClasses);
      setCampus(loadedCampus);
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

  const [utilisateurSelected, setUtilisateurSelected] = useState<
    UtilisateurInterface | undefined
  >(undefined);
  const [isModalUtilisateurOpen, setIsModalUtilisateurOpen] = useState<boolean>(false);

  const handleModifierUtilisateur = (utilisateur: UtilisateurInterface) => {
    if (!utilisateur) return;
    setCampus(campusList.filter((user) => user.id !== utilisateur.id));
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
    ApiPost("https://127.0.0.1:8000/api/utilisateur/delete", campusSelected);
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

  const [campusSelected, setCampusSelected] = useState<
    CampusInterface | undefined
  >(undefined);
  const [isModalCampusOpen, setIsModalCampusOpen] = useState(false);

  const handleModifierCampus = (campusSelected: CampusInterface) => {
    if (!campusSelected) return;
    setCampus(campusList.filter((campus) => campus.id !== campusSelected.id));
    setCampusSelected(campusSelected);
    setIsModalCampusOpen(true);
  };

  const handleSupprimerCampus = (campusSelected: CampusInterface) => {
    if (!campusSelected) return;
    if (!window.confirm("êtes vous sur de vouloir supprimer ce campus ?"))
      return;
    setCampus(campusList.filter((campus) => campus.id !== campusSelected.id));
    // todo appel api pour supprimer le campus
    ApiPost("https://127.0.0.1:8000/api/campus/delete", campusSelected);
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
                          Modifier
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
                  {campusList.map((campus) => (
                    <div key={campus.id}>
                      <tr key={campus.id}>
                        <td>{campus.libelle}</td>
                        <td>
                          <button
                            className="btn btn-outline btn-accent"
                            onClick={() => handleModifierCampus(campus)}
                          >
                            Modifier
                          </button>
                          <button
                            className="btn btn-outline btn-error"
                            onClick={() => handleSupprimerCampus(campus)}
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

      {campusSelected && (
        <EditCampusModal
          isModalCampusOpen={isModalCampusOpen}
          setIsModalCampusOpen={setIsModalCampusOpen}
          campusSelected={campusSelected}
        />
      )}
      <CreateCampusModal
        showModalCreateCampus={showModalCreateCampus}
        setShowModalCreateCampus={setShowModalCreateCampus}
      />
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
