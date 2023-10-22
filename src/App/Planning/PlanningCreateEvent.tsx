import React, { useEffect, useState } from "react";
import { ApiPost } from "../../Framework/useApi/useApiPost";
import { useUtilisateurSelect } from "../Utilisateur/utilisateurSelect";
import { useModuleSelect } from "../Formations/useModuleSelect";
import { usePromoSelect } from "../Promotion/usePromoSelect";
import { useRoomSelect } from "../Salle/useRoomSelect";

export function PlanningCreateEvent({ onSubmit, onClose, selectedDate }: any) {
  const [endDate, setEndDate] = useState<Date | null>(null); // Date de fin
  const [selectedTrainer, setSelectedTrainer] = useState(""); // Formateur sélectionné
  const [selectedModule, setSelectedModule] = useState(""); // Formateur sélectionné
  const [selectedClass, setSelectedClass] = useState(""); // Classe sélectionnée
  const [selectedRoom, setSelectedRoom] = useState(""); // Salle sélectionnée

  const selectUserTab = useUtilisateurSelect();
  const selectModuleTab = useModuleSelect();
  const selectClassTab = usePromoSelect();
  const selectRoomTab = useRoomSelect();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !endDate ||
      !selectedTrainer ||
      !selectedModule ||
      !selectedClass ||
      !selectedRoom
    ) {
      alert("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    const eventData = {
      moduleFormationId: selectedModule,
      classeId: selectedClass,
      salleId: selectedRoom,
      utilisateurId: selectedTrainer,
      dateDebut: selectedDate ? selectedDate.toISOString() : "",
      dateFin: endDate.toISOString(),
    };

    const { result, error } = await ApiPost("/api/sessions", eventData);

    if (error) {
      alert("Une erreur est survenue lors de l'ajout de l'événement.");
    } else {
      alert("Evénement ajouté avec succès!");
      setSelectedModule("");
      setSelectedClass("");
      setSelectedRoom("");
      setSelectedTrainer("");
      setEndDate(null);

      onClose();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2" htmlFor="module">
          Module
        </label>
        <select
          id="module"
          value={selectedModule}
          onChange={(e) => setSelectedModule(e.target.value)}
          className="border p-2 w-full"
          required
        >
          <option value="-1">
            {selectModuleTab.length <= 0
              ? "Chargement des modules..."
              : "Sélectionnez un module"}
          </option>

          {selectModuleTab.map((module) => (
            <option key={module.id} value={module.id}>
              {module.value}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2" htmlFor="class">
          Classe
        </label>
        <select
          id="class"
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          className="border p-2 w-full"
          required
        >
          <option value="-1">
            {selectClassTab.length <= 0
              ? "Chargement des classes..."
              : "Sélectionnez une classe"}
          </option>

          {selectClassTab.map((classe) => (
            <option key={classe.id} value={classe.id}>
              {classe.value}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2" htmlFor="room">
          Salle
        </label>
        <select
          id="room"
          value={selectedRoom}
          onChange={(e) => setSelectedRoom(e.target.value)}
          className="border p-2 w-full"
          required
        >
          <option value="-1">
            {selectRoomTab.length <= 0
              ? "Chargement des salles..."
              : "Sélectionnez une salle"}
          </option>

          {selectRoomTab.map((room) => (
            <option key={room.id} value={room.id}>
              {room.value}
            </option>
          ))}
        </select>
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
          <option value="-1">
            {selectUserTab.length <= 0
              ? "Chargement des utilisateurs..."
              : "Sélectionnez un formateur"}
          </option>

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
