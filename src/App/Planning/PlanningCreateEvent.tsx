import React, { useEffect, useState } from "react";
import { ApiPost } from "../../Framework/useApi/useApiPost";
import { ApiGet } from "../../Framework/useApi/useApiGet";
import { UtilisateurInterface } from "../Utilisateur/Compte";
import { useUtilisateurSelect } from "../Utilisateur/utilisateurSelect";

export function PlanningCreateEvent({ onSubmit, onClose, selectedDate }: any) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedTrainer, setSelectedTrainer] = useState(""); // Formateur sélectionné
  const [endDate, setEndDate] = useState<Date | null>(null); // Date de fin

  const selectUserTab = useUtilisateurSelect();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation basique
    if (title.trim() === "") {
      alert("Veuillez entrer un titre pour l'événement.");
      return;
    }

    const eventData = {
      title,
      description,
      // Ajoutez d'autres champs ici si nécessaire
    };

    const { result, error } = await ApiPost("/api/add-events", eventData);

    if (error) {
      alert("Une erreur est survenue lors de l'ajout de l'événement.");
    } else {
      console.log("Evénement ajouté avec succès :", result);
      // Vous pouvez ajouter des actions supplémentaires ici, comme la mise à jour du calendrier ou la notification à l'utilisateur.
    }

    setTitle("");
    setDescription("");

    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2" htmlFor="event-title">
          Titre de l'événement
        </label>
        <input
          type="text"
          id="event-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full"
          required
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-sm font-medium mb-2"
          htmlFor="event-description"
        >
          Description (optionnelle)
        </label>
        <textarea
          id="event-description"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 w-full"
        ></textarea>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2" htmlFor="trainer">
          Formateur
        </label>
        <select
          id="trainer"
          value={selectedTrainer}
          onChange={(e) => setSelectedTrainer(e.target.value)}
          className="border p-2 w-full"
          required
        >
          <option value="-1">Sélectionnez un formateur</option>
          {selectUserTab.map((user) => (
            <option key={user.id} value={user.id}>
              {user.value}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2" htmlFor="start-date">
          Date de début
        </label>
        <input
          type="text"
          id="start-date"
          value={selectedDate ? selectedDate.toLocaleDateString("fr-FR") : ""}
          readOnly
          className="border p-2 w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2" htmlFor="end-date">
          Date de fin
        </label>
        <input
          type="date"
          id="end-date"
          value={endDate ? endDate.toISOString().split("T")[0] : ""}
          onChange={(e) => setEndDate(new Date(e.target.value))}
          className="border p-2 w-full"
          required
        />
      </div>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onClose}
          className="btn btn-outline mr-2"
        >
          Annuler
        </button>
        <button type="submit" className="btn btn-primary">
          Ajouter
        </button>
      </div>
    </form>
  );
}
