import { useState } from "react";
import { ApiPost } from "../../Framework/useApi/useApiPost";
import { UtilisateurInterface } from "./Compte";
import { RoleSelect } from "./SelectRole";

export function CreateUtilisateurModal(props: {
  showModalCreateUtilisateur: boolean;
  setShowModalCreateUtilisateur: React.Dispatch<React.SetStateAction<boolean>>;
  setRefreshWidgetFormateur: React.Dispatch<React.SetStateAction<number>>;
}) {
  const {
    setShowModalCreateUtilisateur,
    showModalCreateUtilisateur,
    setRefreshWidgetFormateur,
  } = props;
  const [formData, setFormData] = useState<UtilisateurInterface>({
    etablissementId: 1,
    email: "",
    nom: "",
    prenom: "",
    roles: [],
    password: "Azerty123*",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const singleRole = formData.roles[0] || "";

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
                const response = await ApiPost("/api/utilisateurs", {
                  etablissementId : formData.etablissementId,
                  email : formData.email,
                  nom : formData.nom,
                  prenom : formData.prenom,
                  roles : formData.roles[0],
                  password : formData.password,
                });
                if (response) {
                  setShowModalCreateUtilisateur(false);
                  setRefreshWidgetFormateur((prev) => prev + 1);
                }
              }}
            >
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
                  onClick={() => setShowModalCreateUtilisateur(false)}
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
