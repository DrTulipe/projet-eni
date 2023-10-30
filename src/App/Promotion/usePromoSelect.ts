import { useEffect, useState } from "react";
import { ApiGet } from "../../Framework/useApi/useApiGet";
import { ClasseInterface } from "../Admin/GestionClasses";

export function usePromoSelect() {
  const [selectPromoTab, setSelectPromoTab] = useState<{ id: number; value: string }[]>([]);

  useEffect(() => {
    async function fetchTrainers() {
      const formateursApiUrl = "/api/classes";
      const result = await ApiGet(formateursApiUrl);

      if (result === "ERROR") {
        console.error("Erreur lors de la récupération des promotions:");
        return;
      }

      if (!result) return;

      const updatedSelectPromoTab = result.map((promo: ClasseInterface) => ({
        id: promo.id ?? 0,
        value: `${promo.libelle + " - Eleves : " + promo.nombreEleves}`
      }));

      setSelectPromoTab(updatedSelectPromoTab);
    }

    fetchTrainers();
  }, []);

  return selectPromoTab;
}
