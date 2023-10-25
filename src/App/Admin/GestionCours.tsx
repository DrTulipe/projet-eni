import { useEffect, useState } from "react";
import { ApiGet } from "../../Framework/useApi/useApiGet";
import { ApiPost } from "../../Framework/useApi/useApiPost";
import Button from "../../Framework/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { ModuleFormationInterface } from "../Formations/useModuleSelect";
import { ApiDelete } from "../../Framework/useApi/useApiDelete";
import TimePicker from "react-time-picker";
import { useLoading } from "../../Framework/LoaderOverlay";

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
  setRefreshList: React.Dispatch<React.SetStateAction<number>>;
}) {
  const {
    setIsModalModuleFormationOpen,
    moduleFormationSelected,
    setModuleFormationSelected,
    setRefreshList,
  } = props;

  const isoToTime = (isoString: string) => {
    const date = new Date(isoString);
    const hours = String(date.getUTCHours()).padStart(2, "0");
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const [formData, setFormData] = useState<ModuleFormationInterface>({
    ...moduleFormationSelected,
    duree: moduleFormationSelected.duree
      ? isoToTime(moduleFormationSelected.duree)
      : "",
  });

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
                const [hours, minutes] = formData.duree
                  ? formData.duree.split(":").map(Number)
                  : [0, 0];
                const date = new Date(
                  Date.UTC(1970, 0, 1, hours, minutes, 0, 0)
                );
                // const formattedDate = date.toISOString();
                date.setHours(hours, minutes, 0, 0);
                const payload = {
                  ...formData,
                  duree: hours,
                };
                ApiPost("/api/modules", payload);
                setRefreshList((prev) => prev + 1);
                setIsModalModuleFormationOpen(false);
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
                  type="time"
                  name="duree"
                  value={formData.duree || ""}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                />
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
                  {"‎ ‎ "}
                <button type="submit" className="btn btn-primary">
                  Enregistrer
                </button>
              </div>
            </form>
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
  setRefreshList: React.Dispatch<React.SetStateAction<number>>;
}) {
  const {
    setShowModalCreateModuleFormation,
    showModalCreateModuleFormation,
    setRefreshList,
  } = props;

  const [formData, setFormData] = useState<ModuleFormationInterface>({
    id: 0,
    libelle: "",
    duree: "00:00",
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
          <h2 className="text-2xl font-semibold mb-4">
            Créer un module de formation
          </h2>
          <div>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const [hours, minutes] = formData.duree
                  ? formData.duree.split(":").map(Number)
                  : [0, 0];
                const date = new Date(
                  Date.UTC(1970, 0, 1, hours, minutes, 0, 0)
                );
                // const formattedDate = date.toISOString();
                date.setHours(hours, minutes, 0, 0);
                const payload = {
                  ...formData,
                  duree: hours,
                };
                const response = await ApiPost("/api/modules", payload);
                if (response) {
                  setShowModalCreateModuleFormation(false);
                  setRefreshList((prev) => prev + 1);
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
                  type="time"
                  name="duree"
                  value={formData.duree}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                />
              </div>
              <div className="modal-action">
                <button
                  onClick={() => setShowModalCreateModuleFormation(false)}
                  className="btn"
                >
                  Annuler
                </button>
                  {"‎ ‎ "}
                <button type="submit" className="btn btn-primary">
                  Enregistrer
                </button>
              </div>
            </form>
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
  const [refreshList, setRefreshList] = useState<number>(0);
  const { setLoading } = useLoading();

  useEffect(() => {
    async function loadData() {
      const loadedModuleFormation: ModuleFormationInterface[] =
        await ApiGet("/api/modules", setLoading);
      setModuleFormation(loadedModuleFormation);
    }
    loadData();
  }, [refreshList]);

  // * Fonctions
  const handleModifierModuleFormation = (
    moduleFormationSelected: ModuleFormationInterface
  ) => {
    setModuleFormationSelected(moduleFormationSelected);
    setIsModalModuleFormationOpen(true);
  };

  const handleSupprimerModuleFormation = (
    moduleFormationSelected: ModuleFormationInterface
  ) => {
    if (!moduleFormationSelected) return;
    if (
      !window.confirm(
        "Êtes vous sur de vouloir supprimer ce module de formation ?"
      )
    )
      return;
    ApiDelete("/api/modules/" + moduleFormationSelected.id);
    setRefreshList((prev) => prev + 1);
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2>Gestion des Modules de Formation</h2>
        <button className="btn btn-primary"
          onClick={() => {
            openModalCreateModuleFormation();
          }}
        >
          Ajouter un Module
        </button>
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
                  {"‎ ‎ "}
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
          setRefreshList={setRefreshList}
        />
        {isModalModuleFormationOpen && moduleFormationSelected && (
          <EditModuleFormationModal
            setIsModalModuleFormationOpen={setIsModalModuleFormationOpen}
            moduleFormationSelected={moduleFormationSelected}
            setModuleFormationSelected={setModuleFormationSelected}
            setRefreshList={setRefreshList}
          />
        )}
      </div>
    </div>
  );
}
