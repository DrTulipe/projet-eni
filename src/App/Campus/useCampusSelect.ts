
import { useEffect, useState } from "react";
import { ApiGet } from "../../Framework/useApi/useApiGet";
import { CampusInterface } from "../Admin/GestionCampus";

export function useCampusSelect() {
  const [selectCampusTab, setSelectCampusTab] = useState<{ id: number; value: string }[]>([]);

  useEffect(() => {
    async function fetchTrainers() {
      const campusApiUrl = "/api/etablissements";
      const result = await ApiGet(campusApiUrl);

      if (result === "ERROR") {
        console.error("Erreur lors de la récupération des établissements:");
        return;
      }

      if (!result) return;

      const updatedSelectCampusTab = result.map((campus: CampusInterface) => ({
        id: campus.id ?? 0,
        value: `${campus.libelle}`
      }));

      setSelectCampusTab(updatedSelectCampusTab);
    }

    fetchTrainers();
  }, []);

  return selectCampusTab;
}
