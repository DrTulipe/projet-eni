import { useState } from "react";
import { ApiGet } from "../../Framework/useApi/useApiGet";
import { ApiPost } from "../../Framework/useApi/useApiPost";

export interface ClasseInterface {
  id: number;
  libelle: string;
  nombre_eleves: number;
}

export async function fetchClasses() {
  const { result, error } = await ApiGet("/api/classes");

  if (error) {
    console.error("Erreur lors de la récupération des classes:", error);
    return [];
  }

  return result;
}

export async function createClass(data: any) {
  const { result, error } = await ApiPost(
    "/api/classes",
    data
  );

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
    nombre_eleves: 0,
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
                const response = await ApiPost(
                  "/api/campus",
                  formData
                );
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
                  value={formData.nombre_eleves}
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
            <button
              type="submit"
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
