import { useEffect, useState } from "react";
import { ApiGet } from "../../Framework/useApi/useApiGet";
import { ApiPost } from "../../Framework/useApi/useApiPost";
import Button from "../../Framework/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { ModuleFormationInterface } from "../Formations/useModuleSelect";

export async function fetchModuleFormation() {
  const result = await ApiGet("/api/modules");
  return result;
}

export async function createModuleFormation(data: ModuleFormationInterface) {
  const { result, error } = await ApiPost("/api/modules", data);

  if (error) {
    console.error("Erreur lors de la création du moduleFormation:", error);
    return null;
  }

  return result;
}

export function EditModuleFormationModal(props: {
  setIsModalModuleFormationOpen: React.Dispatch<React.SetStateAction<boolean>>;
  moduleFormationSelected: ModuleFormationInterface;
  setModuleFormationSelected: React.Dispatch<
    React.SetStateAction<ModuleFormationInterface | undefined>
  >;
}) {
  const {
    setIsModalModuleFormationOpen,
    moduleFormationSelected,
    setModuleFormationSelected,
  } = props;

  const [formData, setFormData] = useState<ModuleFormationInterface>(
    moduleFormationSelected
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="modal modal-open">
        <div className="modal-box">
          <h2 className="text-2xl font-semibold mb-4">
            Modifier ModuleFormation
          </h2>
          <div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                ApiPost("/api/modules", formData);
              }}
            >
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Libelle:
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
                  Durée:
                </label>
                <input
                  type="text"
                  name="duree"
                  value={formData.duree || ""}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                />
              </div>
            </form>
          </div>
          <div className="modal-action">
            <button
              onClick={() => {
                setIsModalModuleFormationOpen(false);
                setModuleFormationSelected(undefined);
              }}
              className="btn"
            >
              Annuler
            </button>
            <button
              onClick={() => {
                setIsModalModuleFormationOpen(false);
              }}
              className="btn btn-primary"
            >
              Enregistrer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CreateModuleFormationModal(props: {
  showModalCreateModuleFormation: boolean;
  setShowModalCreateModuleFormation: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}) {
  const { setShowModalCreateModuleFormation, showModalCreateModuleFormation } =
    props;

  const [formData, setFormData] = useState<ModuleFormationInterface>({
    id: 0,
    libelle: "",
    duree: "00:00:00",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (!showModalCreateModuleFormation) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="modal modal-open">
        <div className="modal-box">
          <h2 className="text-2xl font-semibold mb-4">Créer ModuleFormation</h2>
          <div>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const response = await ApiPost("/api/modules", formData);
                if (response) {
                  setShowModalCreateModuleFormation(false);
                }
              }}
            >
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Libelle:
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
                  Durée:
                </label>
                <input
                  type="text"
                  name="duree"
                  value={formData.duree}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                />
              </div>
            </form>
          </div>
          <div className="modal-action">
            <button
              onClick={() => setShowModalCreateModuleFormation(false)}
              className="btn"
            >
              Annuler
            </button>
            <button
              type="submit"
              onClick={() => {
                // Traitez la soumission de modifications ici
              }}
              className="btn btn-primary"
            >
              Enregistrer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ModuleFormationListCard() {
  // * States
  const openModalCreateModuleFormation = () =>
    setShowModalCreateModuleFormation(true);
  const [moduleFormationList, setModuleFormation] = useState<
    ModuleFormationInterface[]
  >([]);
  const [showModalCreateModuleFormation, setShowModalCreateModuleFormation] =
    useState<boolean>(false);
  const [moduleFormationSelected, setModuleFormationSelected] = useState<
    ModuleFormationInterface | undefined
  >(undefined);
  const [isModalModuleFormationOpen, setIsModalModuleFormationOpen] =
    useState(false);
  const [moduleFormationName, setModuleFormationName] = useState<string>("");

  useEffect(() => {
    async function loadData() {
      const loadedModuleFormation: ModuleFormationInterface[] =
        await fetchModuleFormation();
      setModuleFormation(loadedModuleFormation);
    }
    loadData();
  }, []);

  // * Fonctions
  const handleModifierModuleFormation = (
    moduleFormationSelected: ModuleFormationInterface
  ) => {
    // if (!moduleFormationSelected) return;
    setModuleFormationSelected(moduleFormationSelected);
    setIsModalModuleFormationOpen(true);
  };
  const closeModalCreateModuleFormation = () =>
    setShowModalCreateModuleFormation(false);

  const handleSubmitModuleFormation = async (data: any) => {
    const newModuleFormation = await createModuleFormation(data);
    if (!newModuleFormation) {
      alert("Un erreur est survenue lors de la création");
      return;
    }
    setModuleFormation((prev) => [...prev, newModuleFormation]);
    closeModalCreateModuleFormation();
    setModuleFormationName("");
  };

  const handleAddModuleFormation = async () => {
    if (moduleFormationName.trim() === "") {
      alert("Veuillez saisir un nom de moduleFormation.");
      return;
    }

    await handleSubmitModuleFormation({ name: moduleFormationName });
  };
  const handleSupprimerModuleFormation = (
    moduleFormationSelected: ModuleFormationInterface
  ) => {
    if (!moduleFormationSelected) return;
    if (
      !window.confirm("êtes vous sur de vouloir supprimer ce moduleFormation ?")
    )
      return;
    setModuleFormation(
      moduleFormationList.filter(
        (moduleFormation) => moduleFormation.id !== moduleFormationSelected.id
      )
    );
    // todo appel api pour supprimer le moduleFormation
    // ApiDelete("/api/modules", moduleFormationSelected);
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2>Gestion des Modules de Formation</h2>
        <Button
          onClick={() => {
            openModalCreateModuleFormation();
          }}
        >
          Ajouter un Module
        </Button>
      </div>
      <div className="card-content">
        <div className="bidule">
          <table className="table w-full table-scrollable">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Durée</th>
                <th className="action-column">Action</th>
              </tr>
            </thead>
            <tbody>
              {moduleFormationList.map((moduleFormation) => {
                const dateStr = moduleFormation.duree;
                const dateObj = new Date(dateStr as string);

                const hours = String(dateObj.getUTCHours()).padStart(2, "0");
                const minutes = String(dateObj.getUTCMinutes()).padStart(
                  2,
                  "0"
                );
                return (
                  <tr key={moduleFormation.id}>
                    <td>{moduleFormation.libelle}</td>
                    <td>{hours + ":" + minutes}</td>
                    <td className="action-column">
                      <button
                        className="btn btn-outline btn-accent"
                        onClick={() => {
                          handleModifierModuleFormation(moduleFormation);
                        }}
                      >
                        <EditIcon />
                      </button>
                      <button
                        className="btn btn-outline btn-error"
                        onClick={() =>
                          handleSupprimerModuleFormation(moduleFormation)
                        }
                      >
                        <DeleteIcon />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <CreateModuleFormationModal
          showModalCreateModuleFormation={showModalCreateModuleFormation}
          setShowModalCreateModuleFormation={setShowModalCreateModuleFormation}
        />
        {isModalModuleFormationOpen && moduleFormationSelected && (
          <EditModuleFormationModal
            setIsModalModuleFormationOpen={setIsModalModuleFormationOpen}
            moduleFormationSelected={moduleFormationSelected}
            setModuleFormationSelected={setModuleFormationSelected}
          />
        )}
      </div>
    </div>
  );
}
