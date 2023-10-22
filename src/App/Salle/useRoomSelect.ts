import { useEffect, useState } from "react";
import { ApiGet } from "../../Framework/useApi/useApiGet";

export interface SalleInterface {
  id: number;
  libelle: string;
  nbPlace?: number;
}

export function useRoomSelect() {
  const [selectRoomTab, setSelectRoomTab] = useState<
    { id: number; value: string }[]
  >([]);

  useEffect(() => {
    async function fetchRooms() {
      const roomApiUrl = "/api/salles";
      const result = await ApiGet(roomApiUrl);

      if (result === "ERROR") {
        console.error("Erreur lors de la récupération des salles:");
        return;
      }

      if (!result) return;

      const updatedSelectRoomTab = result.map((room: SalleInterface) => ({
        id: room.id ?? 0,
        value: `${room.libelle}`,
      }));

      setSelectRoomTab(updatedSelectRoomTab);
    }

    fetchRooms();
  }, []);

  return selectRoomTab;
}
