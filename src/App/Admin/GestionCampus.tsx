import { useEffect, useState } from "react";
import { ApiGet } from "../../Framework/useApi/useApiGet";
import { ApiPost } from "../../Framework/useApi/useApiPost";
import Button from "../../Framework/Button";
import "./widgetTab.css";

export interface CampusInterface {
  id?: number;
  libelle: string;
  numVoie: string;
  rue: string;
  ville: string;
  codePostal: number;
  numeroTel: number;
}

export async function fetchCampus() {
  const result = await ApiGet("/api/etablissements");
  return result;
}

export async function createCampus(data: CampusInterface) {
  const { result, error } = await ApiPost("/api/campus", data);

  if (error) {
    console.error("Erreur lors de la création du campus:", error);
    return null;
  }

  return result;
}

export function EditCampusModal(props: {
  isModalCampusOpen: boolean;
  setIsModalCampusOpen: React.Dispatch<React.SetStateAction<boolean>>;
  campusSelected: CampusInterface;
}) {
  const { isModalCampusOpen, setIsModalCampusOpen, campusSelected } = props;

  const [formData, setFormData] = useState<CampusInterface>(campusSelected);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (!isModalCampusOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="modal modal-open">
        <div className="modal-box">
          <h2 className="text-2xl font-semibold mb-4">Modifier Campus</h2>
          <div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                // todo soumission du form
                ApiPost("/api/campus", formData);
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
            <button onClick={() => setIsModalCampusOpen(false)} className="btn">
              Annuler
            </button>
            <button
              onClick={() => {
                // Traitez la soumission de modifications ici
                setIsModalCampusOpen(false);
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

export function CreateCampusModal(props: {
  showModalCreateCampus: boolean;
  setShowModalCreateCampus: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { setShowModalCreateCampus, showModalCreateCampus } = props;

  const [formData, setFormData] = useState<CampusInterface>({
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

  if (!showModalCreateCampus) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="modal modal-open">
        <div className="modal-box">
          <h2 className="text-2xl font-semibold mb-4">Créer Campus</h2>
          <div>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                // todo soumission du form
                const response = await ApiPost("/api/campus", formData);
                if (response) {
                  setShowModalCreateCampus(false);
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
              onClick={() => setShowModalCreateCampus(false)}
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

export function CampusListCard() {
  // * States
  const openModalCreateCampus = () => setShowModalCreateCampus(true);
  const [campusList, setCampus] = useState<CampusInterface[]>([]);
  const [showModalCreateCampus, setShowModalCreateCampus] =
    useState<boolean>(false);
  const [campusSelected, setCampusSelected] = useState<
    CampusInterface | undefined
  >(undefined);
  const [isModalCampusOpen, setIsModalCampusOpen] = useState(false);
  const [campusName, setCampusName] = useState<string>("");

  useEffect(() => {
    async function loadData() {
      const loadedCampus: CampusInterface[] = await fetchCampus();
      setCampus(loadedCampus);
    }
    loadData();
  }, []);

  // * Fonctions
  const handleModifierCampus = (campusSelected: CampusInterface) => {
    if (!campusSelected) return;
    setCampus(campusList.filter((campus) => campus.id !== campusSelected.id));
    setCampusSelected(campusSelected);
    setIsModalCampusOpen(true);
  };
  const closeModalCreateCampus = () => setShowModalCreateCampus(false);

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

  const handleAddCampus = async () => {
    if (campusName.trim() === "") {
      alert("Veuillez saisir un nom de campus.");
      return;
    }

    await handleSubmitCampus({ name: campusName });
  };
  const handleSupprimerCampus = (campusSelected: CampusInterface) => {
    if (!campusSelected) return;
    if (!window.confirm("êtes vous sur de vouloir supprimer ce campus ?"))
      return;
    setCampus(campusList.filter((campus) => campus.id !== campusSelected.id));
    // todo appel api pour supprimer le campus
    ApiPost("/api/campus/delete", campusSelected);
  };

  return (
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
        <table className="table w-full table-scrollable">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Ville</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {campusList.map((campus) => (
              <tr key={campus.id}>
                <td>{campus.libelle}</td>
                <td>{campus.ville}</td>
                <td>
                  <button
                    className="btn btn-outline btn-accent"
                    onClick={() => handleModifierCampus(campus)}
                  >
                    Enregistrer
                  </button>
                  <button
                    className="btn btn-outline btn-error"
                    onClick={() => handleSupprimerCampus(campus)}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <CreateCampusModal
        showModalCreateCampus={showModalCreateCampus}
        setShowModalCreateCampus={setShowModalCreateCampus}
      />
      {campusSelected && (
        <EditCampusModal
          isModalCampusOpen={isModalCampusOpen}
          setIsModalCampusOpen={setIsModalCampusOpen}
          campusSelected={campusSelected}
        />
      )}
    </div>
  );
}
