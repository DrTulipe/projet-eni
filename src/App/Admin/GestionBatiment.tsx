import { useEffect, useState } from "react";
import { ApiGet } from "../../Framework/useApi/useApiGet";
import { ApiPost } from "../../Framework/useApi/useApiPost";
import Button from "../../Framework/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export interface BatimentInterface {
  id?: number;
  libelle: string;
  numVoie: string;
  rue: string;
  ville: string;
  codePostal: number;
  numeroTel: number;
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
}) {
  const {
    isModalBatimentOpen,
    setIsModalBatimentOpen,
    batimentSelected,
    setBatimentSelected,
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
                // todo soumission du form
                ApiPost("/api/batiment", formData);
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
                  name="num_voie"
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
                  name="code_postal"
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
                  name="numero_tel"
                  value={formData.numeroTel}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                />
              </div>
            </form>
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
            <button
              onClick={() => {
                setIsModalBatimentOpen(false);
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

export function CreateBatimentModal(props: {
  showModalCreateBatiment: boolean;
  setShowModalCreateBatiment: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { setShowModalCreateBatiment, showModalCreateBatiment } = props;

  const [formData, setFormData] = useState<BatimentInterface>({
    libelle: "",
    numVoie: "",
    rue: "",
    ville: "",
    codePostal: 0,
    numeroTel: 0,
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
                // todo soumission du form
                const response = await ApiPost("/api/batiments", formData);
                if (response) {
                  setShowModalCreateBatiment(false);
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
                  name="num_voie"
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
                  name="code_postal"
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
                  name="numero_tel"
                  value={formData.numeroTel}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                />
              </div>
            </form>
          </div>
          <div className="modal-action">
            <button
              onClick={() => setShowModalCreateBatiment(false)}
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
  const [batimentName, setBatimentName] = useState<string>("");

  useEffect(() => {
    async function loadData() {
      const loadedBatiment: BatimentInterface[] = await fetchBatiment();
      setBatiment(loadedBatiment);
    }
    loadData();
  }, []);

  // * Fonctions
  const handleModifierBatiment = (batimentSelected: BatimentInterface) => {
    if (!batimentSelected) return;
    setBatimentSelected(batimentSelected);
    setIsModalBatimentOpen(true);
  };
  const closeModalCreateBatiment = () => setShowModalCreateBatiment(false);

  const handleSubmitBatiment = async (data: any) => {
    const newBatiment = await createBatiment(data);
    if (!newBatiment) {
      alert("Un erreur est survenue lors de la création");
      return;
    }
    setBatiment((prev) => [...prev, newBatiment]);
    closeModalCreateBatiment();
    setBatimentName("");
  };

  const handleAddBatiment = async () => {
    if (batimentName.trim() === "") {
      alert("Veuillez saisir un nom de batiment.");
      return;
    }

    await handleSubmitBatiment({ name: batimentName });
  };
  const handleSupprimerBatiment = (batimentSelected: BatimentInterface) => {
    if (!batimentSelected) return;
    if (!window.confirm("êtes vous sur de vouloir supprimer ce batiment ?"))
      return;
    setBatiment(
      batimentList.filter((batiment) => batiment.id !== batimentSelected.id)
    );
    // todo appel api pour supprimer le batiment
    ApiPost("/api/batiment/delete", batimentSelected);
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
        />
        {batimentSelected && (
          <EditBatimentModal
            isModalBatimentOpen={isModalBatimentOpen}
            setIsModalBatimentOpen={setIsModalBatimentOpen}
            batimentSelected={batimentSelected}
            setBatimentSelected={setBatimentSelected}
          />
        )}
      </div>
    </div>
  );
}
