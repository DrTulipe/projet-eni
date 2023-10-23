import Button from "../../Framework/Button";
import { useState, useEffect } from "react";
import { ApiPost } from "../../Framework/useApi/useApiPost";
import { UtilisateurInterface } from "./Compte";
import { CreateUtilisateurModal } from "./CreateUtilisateurModal";
import { EditUtilisateurModal } from "./EditUtilisateurModal";
import { fetchFormateurs, createFormateur } from "./GestionUtilisateurs";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { ApiDelete } from "../../Framework/useApi/useApiDelete";
import { roles } from "./SelectRole";

export function UtilisateurList() {
  const [utilisateurSelected, setUtilisateurSelected] = useState<
    UtilisateurInterface | undefined
  >(undefined);

  const [isModalUtilisateurOpen, setIsModalUtilisateurOpen] =
    useState<boolean>(false);
  const [formateurName, setFormateurName] = useState<string>("");
  const [utilisateurList, setUtilisateurList] = useState<
    UtilisateurInterface[]
  >([]);
  const [showModalCreateUtilisateur, setShowModalCreateUtilisateur] =
    useState<boolean>(false);

  const [refreshWidgetFormateur, setRefreshWidgetFormateur] = useState(0);
  useEffect(() => {
    async function loadData() {
      const loadedFormateurs = await fetchFormateurs();
      setUtilisateurList(loadedFormateurs);
    }

    loadData();
  }, [refreshWidgetFormateur]);

  const handleAddFormateur = async () => {
    if (formateurName.trim() === "") {
      alert("Veuillez saisir un nom de formateur.");
      return;
    }

    await handleSubmitFormateur({ name: formateurName });
  };
  const handleModifierUtilisateur = (utilisateur: UtilisateurInterface) => {
    if (!utilisateur) return;
    setUtilisateurSelected(utilisateur);
    setIsModalUtilisateurOpen(true);
  };

  const handleSupprimerUtilisateur = (id?: number) => {
    if (!id) return;
    if (!window.confirm("Êtes vous sur de vouloir supprimer cet utilisateur ?"))
      return;
    ApiDelete("/api/utilisateurs/" + id);
    setRefreshWidgetFormateur((prev) => prev + 1);
  };

  const handleSubmitFormateur = async (data: any) => {
    const newFormateur = await createFormateur(data);
    setUtilisateurList((prev) => [...prev, newFormateur]);
  };
  return (
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
              <th>Role</th>
              <th className="action-column">Action</th>
            </tr>
          </thead>
          <tbody>
            {utilisateurList.map((utilisateur) => (
              <tr key={utilisateur.id}>
                <td>{utilisateur.nom + " " + utilisateur.prenom}</td>
                <td>{(utilisateur.roles && utilisateur.roles[0] === "ROLE_ADMIN") ? "Responsable pédagogique" : (utilisateur.roles && utilisateur.roles[0] === "ROLE_RESPONSABLE_PLANNING") ? "Responsable Planning" : "Enseignant"}</td>
                <td className="action-column">
                  <button
                    className="btn btn-outline btn-accent"
                    onClick={() => handleModifierUtilisateur(utilisateur)}
                  >
                    <EditIcon />
                  </button>
                  <button
                    className="btn btn-outline btn-error"
                    onClick={() => handleSupprimerUtilisateur(utilisateur.id)}
                  >
                    <DeleteIcon />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {utilisateurSelected && (
        <EditUtilisateurModal
          isModalUtilisateurOpen={isModalUtilisateurOpen}
          setIsModalUtilisateurOpen={setIsModalUtilisateurOpen}
          utilisateurSelected={utilisateurSelected}
          setRefreshWidgetFormateur={setRefreshWidgetFormateur}
        />
      )}
      <CreateUtilisateurModal
        setShowModalCreateUtilisateur={setShowModalCreateUtilisateur}
        showModalCreateUtilisateur={showModalCreateUtilisateur}
        setRefreshWidgetFormateur={setRefreshWidgetFormateur}
      />
    </div>
  );
}
