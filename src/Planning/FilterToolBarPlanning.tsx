import { FilterBar } from "../Framework/FilterBar/FilterBar";
import Input from "../Framework/Input";
import { InputSelect } from "../Framework/InputSelect/InputSelect";

export function FilterToolBarPlanning() {
  return (
    <FilterBar>
      <Input name="search" label="Search" />
      <InputSelect
        name={"select"}
        label={"Sélectionner un campus"}
        values={[
            { value: "nantes", label: "Nantes" },
            { value: "rennes", label: "Rennes" },
            { value: "niort", label: "Niort" },
            { value: "quimper", label: "Quimper" },
        ]}
      />
      <InputSelect
        name={"selectPromo"}
        label={"Sélectionner une promo"}
        values={[
            { value: "ms2da", label: "MS2D_012A" },
            { value: "ms2db", label: "MS2D_012B" },
            { value: "cda1", label: "CDA_001P" },
            { value: "cda2", label: "CDA_002P" },
            { value: "cda3", label: "CDA_003P" },
        ]}
      />
      <InputSelect
        name={"selectFormateur"}
        label={"Sélectionner un formateur"}
        values={[
            { value: "didier", label: "Lionel Deglise" },
            { value: "michel", label: "Olivier Piers" },
            { value: "jean", label: "Glorya Metay" },
            { value: "jacques", label: "Stéphane Gobin" },
            { value: "golman", label: "Béatrice Nourry" },
        ]}
      />
    </FilterBar>
  );
}
