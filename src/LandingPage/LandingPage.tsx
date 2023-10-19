import { Container } from "../Framework/Container/Container";
import BrandIconUrl from "../../public/images-logo/PLANNING BY DAY Logo - Original (1).svg";
import planning from "../../public/planificateur.png";
import formations from "../../public/planification.png";
import { isLogged } from "../Login/LoginPage";

export function LandingPage() {
  if (!isLogged) return null;
  return (
    <Container noOverflow center>
      {/* Parent div to manage layout */}
      <div className="flex flex-wrap justify-between">
        {/* prendre toute la largeur */}
        <div className="w-full text-center mb-8">
          <div>Bienvenue sur l'outil de gestion de planning collaboratif</div>
          <img
            className="w-80 mx-auto"
            src={BrandIconUrl}
            alt="Planning By Day"
          />
        </div>
        <div className="card w-96 bg-base-100 shadow-xl mb-8">
          <br />
          <figure>
            <img
              style={{ maxWidth: "100px", maxHeight: "100px" }}
              src={formations}
              alt="Accéder aux formations"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Formations</h2>
            <p>
              Accéder à vos formations, gérez vos formations validées et celles
              en attente de validation
            </p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">
                Aller à la gestion des formations
              </button>
            </div>
          </div>
        </div>
        <br />
        <div className="card w-96 bg-base-100 shadow-xl mb-8">
          <figure>
            <img
              style={{ maxWidth: "100px", maxHeight: "100px" }}
              src={planning}
              alt="Planning"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Planning</h2>
            <p>Gestion du planning global, vision par mois ou par semaine</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Accéder au planning</button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
