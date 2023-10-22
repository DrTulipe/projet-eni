import { useEffect, useState } from "react";
import { FilterBar } from "../../Framework/FilterBar/FilterBar";
import Input from "../../Framework/Input";
import { InputSelect } from "../../Framework/InputSelect/InputSelect";
import { useUtilisateurSelect } from "../Utilisateur/utilisateurSelect";
import { usePromoSelect } from "../Promotion/usePromoSelect";
import { CampusInterface } from "../Admin/GestionCampus";
import { useCampusSelect } from "../Campus/useCampusSelect";

export function FilterToolBarPlanning(props: {
  setRefreshCount: React.Dispatch<React.SetStateAction<any>>;
}) {
  const { setRefreshCount } = props;
  const [selectedTrainer, setSelectedTrainer] = useState(""); // Formateur sélectionné
  const selectUserTab = useUtilisateurSelect();
  const [selectedPromo, setSelectedPromo] = useState(""); // Classe sélectionné
  const selectPromoTab = usePromoSelect();
  const [selectedCampus, setSelectedCampus] = useState(""); // Campus sélectionné
  const selectCampusTab = useCampusSelect();

  useEffect(() => {
    setRefreshCount((prev: number) => prev + 1);
  }, [selectedTrainer, selectedPromo, selectedCampus]);

  return (
    <FilterBar>
      <select
        id="selectCampus"
        value={selectedCampus}
        onChange={(e) => setSelectedCampus(e.target.value)}
        className="border p-2 w-full"
        required
      >
        <option value="-1">
          {selectCampusTab.length <= 0
            ? "Chargement des campus..."
            : "Sélectionnez un campus"}
        </option>

        {selectCampusTab.map((campus) => (
          <option key={campus.id} value={campus.id}>
            {campus.value}
          </option>
        ))}
      </select>
      <select
        id="selectPromo"
        value={selectedPromo}
        onChange={(e) => setSelectedPromo(e.target.value)}
        className="border p-2 w-full"
        required
      >
        <option value="-1">
          {selectPromoTab.length <= 0
            ? "Chargement des classes..."
            : "Sélectionnez une classe"}
        </option>

        {selectPromoTab.map((promo) => (
          <option key={promo.id} value={promo.id}>
            {promo.value}
          </option>
        ))}
      </select>
      <select
        id="selectTrainer"
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
      <button
        className="btn btn-outline mb-4"
        onClick={() =>
          setRefreshCount({
            etablissementId: selectedCampus,
            classeId: selectedPromo,
            utilisateurId: selectedTrainer,
          })
        }
      >
        Rechercher
      </button>
    </FilterBar>
  );
}
