import { useEffect, useState } from "react";
import { ApiGet } from "../../Framework/useApi/useApiGet";
import { UtilisateurInterface } from "./Compte";

export function useUtilisateurSelect() {
  const [selectUserTab, setSelectUserTab] = useState<{ id: number; value: string }[]>([]);

  useEffect(() => {
    async function fetchTrainers() {
      const formateursApiUrl = "/api/utilisateurs";
      const result = await ApiGet(formateursApiUrl);

      if (result === "ERROR") {
        console.error("Erreur lors de la récupération des formateurs:");
        return;
      }

      if (!result) return;

      const updatedSelectUserTab = result.map((user: UtilisateurInterface) => ({
        id: user.id ?? 0,
        value: `${user.nom} ${user.prenom}`
      }));

      setSelectUserTab(updatedSelectUserTab);
    }

    fetchTrainers();
  }, []);

  return selectUserTab;
}
