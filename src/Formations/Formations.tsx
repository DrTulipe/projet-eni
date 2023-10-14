import { Container } from "../Framework/Container/Container";
import { FilterToolBarPlanning } from "../Planning/FilterToolBarPlanning";

export function Formations() {
    return (
      <Container>
        <div className="w-full">
          <FilterToolBarPlanning />
        </div>
      </Container>
    );
  }