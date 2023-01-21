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
    </FilterBar>
  );
}
