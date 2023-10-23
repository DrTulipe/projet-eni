import { useEffect, useState } from "react";
import { ApiGet } from "../../Framework/useApi/useApiGet";
import { ApiPost } from "../../Framework/useApi/useApiPost";
import Button from "../../Framework/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { SalleInterface } from "../Salle/useRoomSelect";
import { ApiDelete } from "../../Framework/useApi/useApiDelete";
import { ApiPut } from "../../Framework/useApi/useApiPut.ts";

export async function fetchSalle() {
  const result = await ApiGet("/api/salles");
  return result;
}

export async function createSalle(data: SalleInterface) {
  const { result, error } = await ApiPost("/api/salles", data);

  if (error) {
    console.error("Erreur lors de la création de la salle:", error);
    return null;
  }

  return result;
}

export function EditSalleModal(props: {
  isModalSalleOpen: boolean;
  setIsModalSalleOpen: React.Dispatch<React.SetStateAction<boolean>>;
  salleSelected: SalleInterface;
  setSalleSelected: React.Dispatch<
    React.SetStateAction<SalleInterface | undefined>
  >;
  setRefreshList: React.Dispatch<React.SetStateAction<number>>;
}) {
  const {
    isModalSalleOpen,
    setIsModalSalleOpen,
    salleSelected,
    setSalleSelected,
    setRefreshList,
  } = props;

  const [formData, setFormData] = useState<SalleInterface>(salleSelected);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (!isModalSalleOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="modal modal-open">
        <div className="modal-box">
          <h2 className="text-2xl font-semibold mb-4">Modifier Salle</h2>
          <div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                ApiPut("/api/salles/" + formData.id, {
                  id: formData.id,
                  libelle: formData.libelle,
                  nbPlace: formData.nbPlace,
                  batimentId: 1,
                });
                setRefreshList((prev) => prev + 1);
                setIsModalSalleOpen(false);
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
                  Nombre de places:
                </label>
                <input
                  type="number"
                  name="nbPlace"
                  value={formData.nbPlace || ""}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                />
              </div>
              <div className="modal-action">
                <button
                  onClick={() => {
                    setIsModalSalleOpen(false);
                    setSalleSelected(undefined);
                  }}
                  className="btn"
                >
                  Annuler
                </button>
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

export function CreateSalleModal(props: {
  showModalCreateSalle: boolean;
  setShowModalCreateSalle: React.Dispatch<React.SetStateAction<boolean>>;
  setRefreshList: React.Dispatch<React.SetStateAction<number>>;
}) {
  const { setShowModalCreateSalle, showModalCreateSalle, setRefreshList } =
    props;

  const [formData, setFormData] = useState<SalleInterface>({
    id: 0,
    libelle: "",
    nbPlace: 0,
    batimentId: 1,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (!showModalCreateSalle) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="modal modal-open">
        <div className="modal-box">
          <h2 className="text-2xl font-semibold mb-4">Créer Salle</h2>
          <div>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const response = await ApiPost("/api/salles", formData);
                if (response) {
                  setRefreshList((prev) => prev + 1);
                  setShowModalCreateSalle(false);
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
                  Nombre de places:
                </label>
                <input
                  type="number"
                  name="nbPlace"
                  value={formData.nbPlace || ""}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                />
              </div>
              <div className="modal-action">
                <button
                  onClick={() => setShowModalCreateSalle(false)}
                  className="btn"
                >
                  Annuler
                </button>
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

export function SalleListCard() {
  const openModalCreateSalle = () => setShowModalCreateSalle(true);
  const [salleList, setSalle] = useState<SalleInterface[]>([]);
  const [showModalCreateSalle, setShowModalCreateSalle] =
    useState<boolean>(false);
  const [salleSelected, setSalleSelected] = useState<
    SalleInterface | undefined
  >(undefined);
  const [isModalSalleOpen, setIsModalSalleOpen] = useState(false);
  const [refreshList, setRefreshList] = useState<number>(0);

  useEffect(() => {
    async function loadData() {
      const loadedSalle: SalleInterface[] = await fetchSalle();
      setSalle(loadedSalle);
    }
    loadData();
  }, [refreshList]);

  const handleModifierSalle = (salleSelected: SalleInterface) => {
    if (!salleSelected) return;
    setSalleSelected(salleSelected);
    setIsModalSalleOpen(true);
  };

  const handleSupprimerSalle = (salleSelected: SalleInterface) => {
    if (!salleSelected) return;
    if (!window.confirm("Êtes vous sur de vouloir supprimer cette salle ?"))
      return;
    ApiDelete("/api/salles/" + salleSelected.id);
    setRefreshList((prev) => prev + 1);
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2>Gestion des Salles</h2>
        <Button
          onClick={() => {
            openModalCreateSalle();
          }}
        >
          Ajouter une salle
        </Button>
      </div>
      <div className="card-content">
        <div className="bidule">
          <table className="table w-full table-scrollable">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Nombre de places</th>
                <th className="action-column">Action</th>
              </tr>
            </thead>
            <tbody>
              {salleList.map((salle) => (
                <tr key={salle.id}>
                  <td>{salle.libelle}</td>
                  <td>{salle.nbPlace || "-"}</td>
                  <td className="action-column">
                    <button
                      className="btn btn-outline btn-accent"
                      onClick={() => handleModifierSalle(salle)}
                    >
                      <EditIcon />
                    </button>
                    <button
                      className="btn btn-outline btn-error"
                      onClick={() => handleSupprimerSalle(salle)}
                    >
                      <DeleteIcon />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <CreateSalleModal
          showModalCreateSalle={showModalCreateSalle}
          setShowModalCreateSalle={setShowModalCreateSalle}
          setRefreshList={setRefreshList}
        />
        {salleSelected && (
          <EditSalleModal
            isModalSalleOpen={isModalSalleOpen}
            setIsModalSalleOpen={setIsModalSalleOpen}
            salleSelected={salleSelected}
            setSalleSelected={setSalleSelected}
            setRefreshList={setRefreshList}
          />
        )}
      </div>
    </div>
  );
}
