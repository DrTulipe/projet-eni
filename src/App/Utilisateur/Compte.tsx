import { useEffect, useState } from "react";
import { ApiGet } from "../../Framework/useApi/useApiGet";
import { ApiPost } from "../../Framework/useApi/useApiPost";
import { getUserInfo } from "../Router/AppConfigRouter";
import { ApiPut } from "../../Framework/useApi/useApiPut.ts";

export interface UtilisateurInterface {
  id?: number;
  etablissement_id?: number;
  etablissement?: { id: number; libelle: string };
  email: string;
  nom: string;
  prenom: string;
  roles: any[];
  password: string;
  passwordNew?: string;
}

export function Compte() {
  const userClean = getUserInfo();
  const [formData, setFormData] = useState<UtilisateurInterface>({
    etablissement_id: 0,
    email: "",
    nom: "",
    prenom: "",
    roles: [],
    password: "",
    passwordNew: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordNew, setShowPasswordNew] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await ApiGet(
        "/api/utilisateurs/" + (userClean !== "" ? userClean.id : "")
      );
      if (response) {
        setFormData({
          etablissement_id: response.etablissement_id,
          email: response.email,
          nom: response.nom,
          prenom: response.prenom,
          roles: response.roles,
          password: "",
          passwordNew: "",
        });
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowPasswordNew = () => {
    setShowPasswordNew(!showPasswordNew);
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // todo envoi des données
    ApiPut("/api/utilisateurs/" + (userClean !== "" ? userClean.id : ""), {
      etablissement_id: formData.etablissement_id,
      email: formData.email,
      nom: formData.nom,
      prenom: formData.prenom,
      password: formData.password,
      passwordNew: formData.passwordNew,
    });
    console.log("Données du formulaire soumises :", formData);
  };
  console.log(formData);
  if (!formData) return null;
  return (
    <div className="max-w-md mx-auto p-6 space-y-4">
      <div className="bg-white shadow-md rounded p-6">
        <h2 className="text-2xl font-semibold">Mon Compte</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Nom :
            </label>
            <input
              type="text"
              name="nom"
              value={formData?.nom}
              onChange={handleInputChange}
              className="input input-bordered w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Prénom :
            </label>
            <input
              type="text"
              name="prenom"
              value={formData?.prenom}
              onChange={handleInputChange}
              className="input input-bordered w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email :
            </label>
            <input
              type="email"
              name="email"
              value={formData?.email}
              onChange={handleInputChange}
              className="input input-bordered w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Ancien Mot de passe :
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData?.password}
                onChange={handleInputChange}
                className="input input-bordered w-full pr-10"
              />
              <button
                type="button"
                onClick={toggleShowPassword}
                className="absolute inset-y-0 right-0 px-2 py-1 flex items-center text-gray-600 hover:text-gray-800"
              >
                {showPassword ? "Cacher" : "Afficher"}
              </button>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Nouveau Mot de passe :
            </label>
            <div className="relative">
              <input
                type={showPasswordNew ? "text" : "password"}
                name="passwordNew"
                value={formData?.passwordNew}
                onChange={handleInputChange}
                className="input input-bordered w-full pr-10"
              />
              <button
                type="button"
                onClick={toggleShowPasswordNew}
                className="absolute inset-y-0 right-0 px-2 py-1 flex items-center text-gray-600 hover:text-gray-800"
              >
                {showPasswordNew ? "Cacher" : "Afficher"}
              </button>
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            Sauvegarder
          </button>
        </form>
      </div>
    </div>
  );
}
