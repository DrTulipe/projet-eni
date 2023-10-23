import { useEffect, useState } from "react";
import { ApiPost } from "../../Framework/useApi/useApiPost";
import { UtilisateurInterface } from "./Compte";
import { RoleSelect } from "./SelectRole";
import { ApiPut } from "../../Framework/useApi/useApiPut.ts";

export function EditUtilisateurModal(props: {
  isModalUtilisateurOpen: boolean;
  setIsModalUtilisateurOpen: React.Dispatch<React.SetStateAction<boolean>>;
  utilisateurSelected: UtilisateurInterface;
  setRefreshWidgetFormateur: React.Dispatch<React.SetStateAction<number>>;
}) {
  const {
    isModalUtilisateurOpen,
    setIsModalUtilisateurOpen,
    utilisateurSelected,
    setRefreshWidgetFormateur,
  } = props;
  const [formData, setFormData] = useState<UtilisateurInterface>({
    email: "",
    nom: "",
    prenom: "",
    roles: [],
    password: "",
  });

  useEffect(() => {
    if (utilisateurSelected) {
      setFormData(utilisateurSelected);
    }
  }, [utilisateurSelected]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    ApiPut("/api/utilisateurs/" + formData.id, {
      etablissement_id: formData.etablissementId,
      email: formData.email,
      nom: formData.nom,
      prenom: formData.prenom,
      password: "",
      passwordNew: "",
    });
    setIsModalUtilisateurOpen(false);
    setRefreshWidgetFormateur((prev) => prev + 1);
  };
  const singleRole = formData.roles[0] || "";
  if (!isModalUtilisateurOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="modal modal-open">
        <div className="modal-box">
          <h2 className="text-2xl font-semibold mb-4">Modifier Utilisateur</h2>
          <div>
            <form onSubmit={handleSubmit}>
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
                <RoleSelect
                  selectedRole={singleRole}
                  onRoleChange={(role) =>
                    setFormData((prev) => ({ ...prev, roles: [role] }))
                  }
                />
              </div>
              <div className="modal-action">
                <button
                  onClick={() => setIsModalUtilisateurOpen(false)}
                  className="btn"
                >
                  Annuler
                </button>
                <button type="submit" className="btn btn-primary">
                  Sauvegarder
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
