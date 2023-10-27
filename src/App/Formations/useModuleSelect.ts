import { useEffect, useState } from "react";
import { ApiGet } from "../../Framework/useApi/useApiGet";
import { isoToTime } from "../../Framework/Date/parseDateToFR";

export interface ModuleFormationInterface {
  id: number;
  libelle: string;
  duree?: string;
}

export function useModuleSelect() {
  const [selectModuleTab, setSelectModuleTab] = useState<
    { id: number; value: string }[]
  >([]);

  useEffect(() => {
    async function fetchTrainers() {
      const modulesApiUrl = "/api/modules";
      const result = await ApiGet(modulesApiUrl);

      if (result === "ERROR") {
        console.error("Erreur lors de la récupération des modules:");
        return;
      }

      if (!result) return;

      const updatedSelectModuleTab = result.map(
        (module: ModuleFormationInterface) => ({
          id: module.id ?? 0,
          value: `${module.libelle + " - Durée : " + isoToTime(module.duree ?? "")}`,
        })
      );

      setSelectModuleTab(updatedSelectModuleTab);
    }

    fetchTrainers();
  }, []);

  return selectModuleTab;
}
