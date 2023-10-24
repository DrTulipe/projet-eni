import { Container } from "../../Framework/Container/Container";
import BrandIconUrl from "../../../public/images-logo/PLANNING BY DAY Logo - Original (1).svg";
import planning from "../../../public/planificateur.png";
import formations from "../../../public/planification.png";
import reglages from "../../../public/reglages.png";
import { useNavigate } from "react-router";
import { getUserInfo } from "../Router/AppConfigRouter";
import { useEffect } from "react";

export function LandingPage() {
  const isLogged = localStorage.getItem("isLogged");
  const userClean = getUserInfo();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogged || isLogged === "false") {
      navigate("/login");
    }
  }, [isLogged]);

  if (!isLogged || isLogged === "false") return null;
  return (
    <Container noOverflow center>
      <div className="flex flex-wrap justify-between space-x-5">
        {userClean !== "" &&
          userClean?.roles &&
          userClean?.roles[0] === "ROLE_USER" && (
            <div className="card w-2/5 bg-base-100 shadow-xl mb-8">
              <figure className="text-center">
                <img
                  style={{ maxWidth: "100px", maxHeight: "100px" }}
                  src={formations}
                  alt="Accéder aux formations"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">Formations</h2>
                <p>
                  Accéder à vos formations, gérez vos formations validées et
                  celles en attente de validation
                </p>
                <div className="card-actions justify-end">
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate("/formations")}
                  >
                    Accéder à la gestion des formations
                  </button>
                </div>
              </div>
            </div>
          )}
        <div className="card w-2/5 bg-base-100 shadow-xl mb-8">
          <figure className="text-center">
            <img
              style={{ maxWidth: "100px", maxHeight: "100px" }}
              src={planning}
              alt="Planning"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Planning</h2>
            <p>Gestion du planning global, vision par mois ou par semaine</p>
            <div
              className="card-actions justify-end"
              onClick={() => navigate("/planning")}
            >
              <button className="btn btn-primary">Accéder au planning</button>
            </div>
          </div>
        </div>

        {userClean !== "" &&
          userClean?.roles &&
          userClean?.roles[0] !== "ROLE_USER" && (
            <div className="card w-2/5 bg-base-100 shadow-xl mb-8">
              <figure className="text-center">
                <img
                  style={{ maxWidth: "100px", maxHeight: "100px" }}
                  src={reglages}
                  alt="Reglages"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">Administration</h2>
                <p>
                  Gestion des utilisateurs, des établissements, des classes, des
                  batiments, des salles et des cursus.
                </p>
                <div
                  className="card-actions justify-end"
                  onClick={() => navigate("/admin")}
                >
                  <button className="btn btn-primary">
                    Accéder au panel Administratif
                  </button>
                </div>
              </div>
            </div>
          )}
      </div>
    </Container>
  );
}
