import { useState } from "react";
import { ApiPost } from "../../Framework/useApi/useApiPost";
import { UtilisateurInterface } from "./Compte";

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
                const response = await ApiPost("/api/classes", formData);
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
