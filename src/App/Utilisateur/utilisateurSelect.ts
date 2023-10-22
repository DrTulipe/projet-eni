import { useEffect, useState } from "react";
import { ApiGet } from "../../Framework/useApi/useApiGet";
import { UtilisateurInterface } from "./Compte";

export function useUtilisateurSelect() {
  const selectUserTab: { id: number; value: string }[] = [];
  useEffect(() => {
    async function fetchTrainers() {
      // Remplacez cette URL par celle de votre API qui retourne la liste des formateurs
      const formateursApiUrl = "/api/utilisateurs";
      const result = await ApiGet(formateursApiUrl);

      if (result == "ERROR") {
        console.error("Erreur lors de la récupération des formateurs:");
      } else {
        if (!result) return;
        result.map((user: UtilisateurInterface) => {
          selectUserTab.push({
            id: user.id ?? 0,
            value: user.nom + " " + user.prenom,
          });
        });
      }
    }
    fetchTrainers();
  }, []);
  return selectUserTab;
}
