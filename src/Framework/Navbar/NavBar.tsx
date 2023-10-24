import { useContext } from "react";
import { FaChevronDown } from "react-icons/fa";
import { GiChickenOven } from "react-icons/gi";
import BrandIconUrl from "../../../public/images-logo/PLANNING BY DAY Logo - Original.svg";
import { useNavigate } from "react-router-dom";
import { getUserInfo } from "../../App/Router/AppConfigRouter";

export function Navbar() {
  const isLogged = localStorage.getItem("isLogged");
  const userClean = getUserInfo();
  const navigate = useNavigate();
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a
          href="/"
          className="btn btn-ghost normal-case text-xl overflow-hidden"
        >
          <img
            className="w-48 -my-[50%] p-0"
            src={BrandIconUrl}
            alt="Planning By Day"
          />
        </a>
        {isLogged === "true" && (
          <div>
            <b>
              {"Connecté en tant que : " +
                userClean.nom +
                " " +
                userClean.prenom}
            </b>
          </div>
        )}
      </div>
      <div className="flex-none">
        {isLogged === "true" ? (
          <ul className="menu menu-horizontal px-1">
            {userClean !== "" &&
              userClean?.roles &&
              userClean?.roles[0] !== "ROLE_USER" && (
                <li>
                  <a
                    onClick={() => {
                      navigate("/admin");
                    }}
                  >
                    Administration
                  </a>
                </li>
              )}
            <li>
              <a
                onClick={() => {
                  navigate("/planning");
                }}
              >
                Planning
              </a>
            </li>
            {userClean !== "" &&
              userClean?.roles &&
              userClean?.roles[0] === "ROLE_ADMIN" && (
                <li>
                  <a
                    onClick={() => {
                      navigate("/support");
                    }}
                  >
                    Support
                  </a>
                </li>
              )}
            <li tabIndex={0}>
              <a>
                Espace personnel
                <FaChevronDown />
              </a>
              <ul className="p-2 bg-base-100" style={{ zIndex: 99 }}>
                <li>
                  <a
                    onClick={() => {
                      navigate("/compte");
                    }}
                  >
                    Mon compte
                  </a>
                </li>
                {userClean !== "" &&
                  userClean?.roles &&
                  userClean?.roles[0] === "ROLE_USER" && (
                    <li>
                      <a
                        onClick={() => {
                          navigate("/formations");
                        }}
                      >
                        Mes formations
                      </a>
                    </li>
                  )}
                <li>
                  <a
                    onClick={() => {
                      localStorage.setItem("token", "INVALID_TOKEN");
                      localStorage.setItem("isLogged", "false");
                      navigate("/login");
                    }}
                  >
                    Me déconnecter
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        ) : (
          <div className="flex-1">
            <a
              href="/login"
              className="btn btn-ghost normal-case text-xl overflow-hidden"
            >
              Se connecter
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
