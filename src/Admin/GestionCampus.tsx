import { useState } from "react";
import { ApiGet } from "../Framework/useApi/useApiGet";
import { ApiPost } from "../Framework/useApi/useApiPost";

export interface CampusInterface {
  id?: number;
  libelle: string;
  num_voie: string;
  rue: string;
  ville: string;
  code_postal: number;
  numero_tel: number;
}

export async function fetchCampus() {
  const { result, error } = await ApiGet("https://127.0.0.1:8000/api/campus");

  if (error) {
    console.error("Erreur lors de la récupération des campus:", error);
    return [];
  }

  return result;
}

export async function createCampus(data: CampusInterface) {
  const { result, error } = await ApiPost(
    "https://127.0.0.1:8000/api/campus",
    data
  );

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
                ApiPost("https://127.0.0.1:8000/api/campus", formData);
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
                  value={formData.num_voie}
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
                  value={formData.code_postal}
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
                  value={formData.numero_tel}
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
              Modifier
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
    num_voie: "",
    rue: "",
    ville: "",
    code_postal: 0,
    numero_tel: 0,
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
                const response = await ApiPost(
                  "https://127.0.0.1:8000/api/campus",
                  formData
                );
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
                  value={formData.num_voie}
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
                  value={formData.code_postal}
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
                  value={formData.numero_tel}
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
