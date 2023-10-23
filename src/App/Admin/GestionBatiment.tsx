import { useEffect, useState } from "react";
import { ApiGet } from "../../Framework/useApi/useApiGet";
import { ApiPost } from "../../Framework/useApi/useApiPost";
import Button from "../../Framework/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { ApiDelete } from "../../Framework/useApi/useApiDelete";
import { ApiPut } from "../../Framework/useApi/useApiPut.ts";

export interface BatimentInterface {
  id?: number;
  libelle: string;
  numVoie: string;
  rue: string;
  ville: string;
  codePostal: number;
  numeroTel: number;
  etablissementId?: number;
}

export async function fetchBatiment() {
  const result = await ApiGet("/api/batiments");
  return result;
}

export async function createBatiment(data: BatimentInterface) {
  const { result, error } = await ApiPost("/api/batiments", data);

  if (error) {
    console.error("Erreur lors de la création du batiment:", error);
    return null;
  }

  return result;
}

export function EditBatimentModal(props: {
  isModalBatimentOpen: boolean;
  setIsModalBatimentOpen: React.Dispatch<React.SetStateAction<boolean>>;
  batimentSelected: BatimentInterface;
  setBatimentSelected: React.Dispatch<
    React.SetStateAction<BatimentInterface | undefined>
  >;
  setRefreshList: React.Dispatch<React.SetStateAction<number>>;
}) {
  const {
    isModalBatimentOpen,
    setIsModalBatimentOpen,
    batimentSelected,
    setBatimentSelected,
    setRefreshList,
  } = props;

  const [formData, setFormData] = useState<BatimentInterface>(batimentSelected);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (!isModalBatimentOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="modal modal-open">
        <div className="modal-box">
          <h2 className="text-2xl font-semibold mb-4">Modifier Batiment</h2>
          <div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                ApiPut("/api/batiments/" + formData.id, {
                  id: formData.id,
                  libelle: formData.libelle,
                  numVoie: formData.numVoie,
                  rue: formData.rue,
                  ville: formData.ville,
                  codePostal: formData.codePostal,
                  numeroTel: formData.numeroTel,
                  etablissementId: formData.etablissementId ?? 1,
                });
                setRefreshList((prev) => prev + 1);
                setIsModalBatimentOpen(false);
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
                  Numéro de voie:
                </label>
                <input
                  type="text"
                  name="numVoie"
                  value={formData.numVoie}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Rue:
                </label>
                <input
                  type="text"
                  name="rue"
                  value={formData.rue}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Ville:
                </label>
                <input
                  type="text"
                  name="ville"
                  value={formData.ville}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Code Postal:
                </label>
                <input
                  type="number"
                  name="codePostal"
                  value={formData.codePostal}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Numéro de téléphone:
                </label>
                <input
                  type="number"
                  name="numeroTel"
                  value={formData.numeroTel}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                />
              </div>
              <div className="modal-action">
                <button
                  onClick={() => {
                    setIsModalBatimentOpen(false);
                    setBatimentSelected(undefined);
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

export function CreateBatimentModal(props: {
  showModalCreateBatiment: boolean;
  setShowModalCreateBatiment: React.Dispatch<React.SetStateAction<boolean>>;
  setRefreshList: React.Dispatch<React.SetStateAction<number>>;
}) {
  const {
    setShowModalCreateBatiment,
    showModalCreateBatiment,
    setRefreshList,
  } = props;

  const [formData, setFormData] = useState<BatimentInterface>({
    libelle: "",
    numVoie: "",
    rue: "",
    ville: "",
    codePostal: 0,
    numeroTel: 0,
    etablissementId: 1,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (!showModalCreateBatiment) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="modal modal-open">
        <div className="modal-box">
          <h2 className="text-2xl font-semibold mb-4">Créer Batiment</h2>
          <div>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const response = await ApiPost("/api/batiments", formData);
                if (response) {
                  setShowModalCreateBatiment(false);
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
                  Numéro de voie:
                </label>
                <input
                  type="text"
                  name="numVoie"
                  value={formData.numVoie}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Rue:
                </label>
                <input
                  type="text"
                  name="rue"
                  value={formData.rue}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Ville:
                </label>
                <input
                  type="text"
                  name="ville"
                  value={formData.ville}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Code Postal:
                </label>
                <input
                  type="number"
                  name="codePostal"
                  value={formData.codePostal}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Numéro de téléphone:
                </label>
                <input
                  type="number"
                  name="numeroTel"
                  value={formData.numeroTel}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                />
              </div>
              <div className="modal-action">
                <button
                  onClick={() => setShowModalCreateBatiment(false)}
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

export function BatimentListCard() {
  // * States
  const openModalCreateBatiment = () => setShowModalCreateBatiment(true);
  const [batimentList, setBatiment] = useState<BatimentInterface[]>([]);
  const [showModalCreateBatiment, setShowModalCreateBatiment] =
    useState<boolean>(false);
  const [batimentSelected, setBatimentSelected] = useState<
    BatimentInterface | undefined
  >(undefined);
  const [isModalBatimentOpen, setIsModalBatimentOpen] = useState(false);
  const [refreshList, setRefreshList] = useState(0);

  useEffect(() => {
    async function loadData() {
      const loadedBatiment: BatimentInterface[] = await fetchBatiment();
      setBatiment(loadedBatiment);
    }
    loadData();
  }, [refreshList]);

  // * Fonctions
  const handleModifierBatiment = (batimentSelected: BatimentInterface) => {
    setBatimentSelected(batimentSelected);
    setIsModalBatimentOpen(true);
  };

  const handleSupprimerBatiment = (batimentSelected: BatimentInterface) => {
    if (!batimentSelected) return;
    if (!window.confirm("Êtes vous sur de vouloir supprimer ce batiment ?"))
      return;
    ApiDelete("/api/batiments/" + batimentSelected.id);
    setRefreshList((prev) => prev + 1);
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2>Gestion des Batiments</h2>
        <Button
          onClick={() => {
            openModalCreateBatiment();
          }}
        >
          Ajouter un batiment
        </Button>
      </div>
      <div className="card-content">
        <div className="bidule">
          <table className="table w-full table-scrollable">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Ville</th>
                <th className="action-column">Action</th>
              </tr>
            </thead>
            <tbody>
              {batimentList.map((batiment) => (
                <tr key={batiment.id}>
                  <td>{batiment.libelle}</td>
                  <td>{batiment.ville}</td>
                  <td className="action-column">
                    <button
                      className="btn btn-outline btn-accent"
                      onClick={() => handleModifierBatiment(batiment)}
                    >
                      <EditIcon />
                    </button>
                    <button
                      className="btn btn-outline btn-error"
                      onClick={() => handleSupprimerBatiment(batiment)}
                    >
                      <DeleteIcon />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <CreateBatimentModal
          showModalCreateBatiment={showModalCreateBatiment}
          setShowModalCreateBatiment={setShowModalCreateBatiment}
          setRefreshList={setRefreshList}
        />
        {batimentSelected && (
          <EditBatimentModal
            isModalBatimentOpen={isModalBatimentOpen}
            setIsModalBatimentOpen={setIsModalBatimentOpen}
            batimentSelected={batimentSelected}
            setBatimentSelected={setBatimentSelected}
            setRefreshList={setRefreshList}
          />
        )}
      </div>
    </div>
  );
}
