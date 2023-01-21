import { Container } from "../Framework/Container/Container";
import BrandIconUrl from "../../public/images-logo/PLANNING BY DAY Logo - Original (1).svg";

export function LandingPage() {
  return (
    <Container noOverflow center>
      <div>
        <div>Bienvenue sur l'outil de gestion de planning collaboratif</div>
          <img
            className="w-80 place-self-center"
            src={BrandIconUrl}
            alt="Planning By Day"
          />
        
      </div>
    </Container>
  );
}
