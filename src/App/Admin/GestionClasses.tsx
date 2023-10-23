import { useEffect, useState } from "react";
import { ApiGet } from "../../Framework/useApi/useApiGet";
import { ApiPost } from "../../Framework/useApi/useApiPost";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Button from "../../Framework/Button";

export interface ClasseInterface {
  id: number;
  libelle: string;
  nombreEleves: number;
}

export async function fetchClasses() {
  const result = await ApiGet("/api/classes");

  if (result === "ERROR") {
    console.error("Erreur lors de la récupération des classes:");
    return;
  }

  return result;
}

export async function createClass(data: any) {
  const { result, error } = await ApiPost("/api/classes", data);

  if (error) {
    console.error("Erreur lors de la création de la classe:", error);
    return null;
  }

  return result;
}

export function CreateClasseModal(props: {
  showModalCreateClasse: boolean;
  setShowModalCreateClasse: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { showModalCreateClasse, setShowModalCreateClasse } = props;
  const [formData, setFormData] = useState<ClasseInterface>({
    id: 0,
    libelle: "",
    nombreEleves: 0,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (!showModalCreateClasse) return;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="modal modal-open">
        <div className="modal-box">
          <h2 className="text-2xl font-semibold mb-4">Créer un Utilisateur</h2>
          <div>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                // todo soumission du form
                const response = await ApiPost("/api/campus", formData);
                if (response) {
                  setShowModalCreateClasse(false);
                }
              }}
            >
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Etablissement ID:
                </label>
                <input
                  type="number"
                  name="id"
                  value={formData.id}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Email:
                </label>
                <input
                  type="text"
                  name="libelle"
                  value={formData.libelle}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Nom:
                </label>
                <input
                  type="number"
                  name="nombre_eleves"
                  value={formData.nombreEleves}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                />
              </div>
            </form>
          </div>
          <div className="modal-action">
            <button
              onClick={() => setShowModalCreateClasse(false)}
              className="btn"
            >
              Annuler
            </button>
            <button type="submit" className="btn btn-primary">
              Enregistrer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ClasseList() {
  const [classes, setClasses] = useState<ClasseInterface[]>([]);

  const [showModalClasse, setShowModalClasse] = useState<boolean>(false);

  const [classeName, setClasseName] = useState<string>("");

  const handleAddClasse = async () => {
    if (classeName.trim() === "") {
      alert("Veuillez saisir un nom de classe.");
      return;
    }

    await handleSubmitClasse({ name: classeName });
  };

  useEffect(() => {
    async function loadData() {
      const loadedClasses = await fetchClasses();
      setClasses(loadedClasses);
    }

    loadData();
  }, []);

  const handleSubmitClasse = async (data: any) => {
    const newClass = await createClass(data);
    setClasses((prev) => [...prev, newClass]);
  };

  const handleModifierClasse = (id: number) => {
    // setClasses(classes.filter((formateur) => formateur.id !== id));
    // todo modal de modification
  };

  const handleSupprimerClasse = (id: number) => {
    setClasses(classes.filter((formateur) => formateur.id !== id));
    // todo appel api pour supprimer la classe
  };

  const openModalCreateClasse = () => setShowModalClasse(true);
  const closeModalCreateClasse = () => setShowModalClasse(false);

  return (
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
              <th>Nombre d'élèves</th>
              <th className="action-column">Action</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((classe) => (
              <tr key={classe.id}>
                <td>{classe.libelle}</td>
                <td>{classe.nombreEleves}</td>
                <td className="action-column">
                  <button
                    className="btn btn-outline btn-accent"
                    onClick={() => handleModifierClasse(classe.id)}
                  >
                    <EditIcon />
                  </button>
                  <button
                    className="btn btn-outline btn-error"
                    onClick={() => handleSupprimerClasse(classe.id)}
                  >
                    <DeleteIcon />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
                  value={classeName}
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
