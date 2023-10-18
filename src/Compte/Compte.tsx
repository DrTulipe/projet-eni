import { useEffect, useState } from "react";

export function Compte() {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // Récupérer le jeton d'authentification depuis le stockage local
    const token = localStorage.getItem("token");

    // Vérifier si l'utilisateur est authentifié en fonction du jeton
    if (token) {
      // Envoyer une requête au backend pour récupérer les informations de l'utilisateur
      fetch("/api/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Erreur lors de la récupération des informations de l'utilisateur");
          }
        })
        .then((data) => {
          // Mettre à jour l'état de l'utilisateur avec les données reçues
          setUser(data);
          // Pré-remplir le formulaire avec les données de l'utilisateur
          setFormData({
            nom: data.nom,
            prenom: data.prenom,
            email: data.email,
            password: "", // Ne pas inclure le mot de passe par sécurité
          });
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération des informations de l'utilisateur :", error);
        });
    }
  }, []);

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // Envoyer une requête au backend pour mettre à jour les informations de l'utilisateur
    // Vous devrez implémenter cette partie en fonction de votre backend
    console.log("Données du formulaire soumises :", formData);
  };

  if (!user) {
    // Afficher un message de chargement ou de connexion
    return <div>Chargement en cours...</div>;
  }

  return (
    <div className="max-w-md mx-auto p-6 space-y-4">
      <div className="bg-white shadow-md rounded p-6">
        <h2 className="text-2xl font-semibold">Mon Compte</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Nom :</label>
            <input
              type="text"
              name="nom"
              value={formData.nom}
              onChange={handleInputChange}
              className="input input-bordered w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Prénom :</label>
            <input
              type="text"
              name="prenom"
              value={formData.prenom}
              onChange={handleInputChange}
              className="input input-bordered w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email :</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="input input-bordered w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Mot de passe :</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
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
