import { useEffect, useState } from "react";
import { ApiGet } from "../Framework/useApi/useApiGet";
import { ApiPost } from "../Framework/useApi/useApiPost";

export interface UtilisateurInterface {
  id?: number;
  etablissement_id?: number;
  email: string;
  nom: string;
  prenom: string;
  roles: any[];
  password: string;
}

export function Compte() {
  const [user, setUser] = useState<UtilisateurInterface | undefined>(undefined);
  const [formData, setFormData] = useState<UtilisateurInterface>({
    etablissement_id: 0,
    email: "",
    nom: "",
    prenom: "",
    roles: [],
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const response = await ApiGet("https://127.0.0.1:8000/api/user?id_user=");
      if (response.result) {
        const data = response.result;
        setUser(data);

        setFormData({
          etablissement_id: data.etablissement_id,
          email: data.email,
          nom: data.nom,
          prenom: data.prenom,
          roles: data.roles,
          password: data.password,
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

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // todo envoi des données
    ApiPost("https://127.0.0.1:8000/api/user", {
      formData,
    });
    console.log("Données du formulaire soumises :", formData);
  };

  // if (!user) {
  //   // Afficher un message de chargement ou de connexion
  //   return <div>Chargement en cours...</div>;
  // }

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
              Mot de passe :
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
          <button type="submit" className="btn btn-primary">
            Sauvegarder
          </button>
        </form>
      </div>
    </div>
  );
}
