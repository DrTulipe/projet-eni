import { useState } from "react";
import { ApiGet } from "../../Framework/useApi/useApiGet";
import { ApiPost } from "../../Framework/useApi/useApiPost";
import { UtilisateurInterface } from "../Compte/Compte";

export async function fetchFormateurs() {
  const { result, error } = await ApiGet(
    "/api/utilisateur"
  );

  if (error) {
    console.error("Erreur lors de la récupération des formateurs:", error);
    return [];
  }

  return result;
}

export async function createFormateur(data: any) {
  const { result, error } = await ApiPost(
    "/api/utilisateur/create",
    data
  );

  if (error) {
    console.error("Erreur lors de la création du formateur:", error);
    return null;
  }

  return result;
}

export async function editFormateur(data: any) {
  const { result, error } = await ApiPost(
    "/api/utilisateur/edit",
    data
  );

  if (error) {
    console.error("Erreur lors de la création du formateur:", error);
    return null;
  }

  return result;
}

export function CreateUtilisateurModal(props: {
  showModalCreateUtilisateur: boolean;
  setShowModalCreateUtilisateur: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { setShowModalCreateUtilisateur, showModalCreateUtilisateur } = props;
  const [formData, setFormData] = useState<UtilisateurInterface>({
    etablissement_id: 0,
    email: "",
    nom: "",
    prenom: "",
    roles: [],
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "roles") {
      // todo : traiter les roles
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  if (!showModalCreateUtilisateur) return;
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
                  setShowModalCreateUtilisateur(false);
                }
              }}
            >
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Etablissement ID:
                </label>
                <input
                  type="number"
                  name="etablissement_id"
                  value={formData.etablissement_id}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Email:
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Nom:
                </label>
                <input
                  type="text"
                  name="nom"
                  value={formData.nom}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Prénom:
                </label>
                <input
                  type="text"
                  name="prenom"
                  value={formData.prenom}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Roles:
                </label>
                <input
                  type="text"
                  name="roles"
                  // todo gérer l'affichage des rôles
                  value={formData.roles.join(", ")}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Mot de passe:
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                />
              </div>
            </form>
          </div>
          <div className="modal-action">
            <button
              onClick={() => setShowModalCreateUtilisateur(false)}
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

export function EditUtilisateurModal(props: {
  isModalUtilisateurOpen: boolean;
  setIsModalUtilisateurOpen: React.Dispatch<React.SetStateAction<boolean>>;
  utilisateurSelected: UtilisateurInterface;
}) {
  const {
    isModalUtilisateurOpen,
    setIsModalUtilisateurOpen,
    utilisateurSelected,
  } = props;
  const [formData, setFormData] = useState<UtilisateurInterface>({
    etablissement_id: 0,
    email: "",
    nom: "",
    prenom: "",
    roles: [],
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "roles") {
      // todo : gestion roles
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  if (!isModalUtilisateurOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="modal modal-open">
        <div className="modal-box">
          <h2 className="text-2xl font-semibold mb-4">Modifier Utilisateur</h2>
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
                  setIsModalUtilisateurOpen(false);
                }
              }}
            >
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Etablissement ID:
                </label>
                <input
                  type="number"
                  name="etablissement_id"
                  value={formData.etablissement_id}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Email:
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Nom:
                </label>
                <input
                  type="text"
                  name="nom"
                  value={formData.nom}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Prénom:
                </label>
                <input
                  type="text"
                  name="prenom"
                  value={formData.prenom}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Roles:
                </label>
                <input
                  type="text"
                  name="roles"
                  // todo traiter affichage roles
                  value={formData.roles.join(", ")}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Mot de passe:
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                />
              </div>
            </form>
          </div>
          <div className="modal-action">
            <button
              onClick={() => setIsModalUtilisateurOpen(false)}
              className="btn"
            >
              Annuler
            </button>
            <button
              type="submit"
              onClick={() => {}}
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
