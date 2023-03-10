import { useContext } from "react";
import { FaChevronDown } from "react-icons/fa";
import { GiChickenOven } from "react-icons/gi";
import BrandIconUrl from "../../../public/images-logo/PLANNING BY DAY Logo - Original.svg";
import { useNavigate } from "react-router-dom";

export function Navbar() {
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
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a
              onClick={() => {
                navigate("/planning");
              }}
            >
              Planning
            </a>
          </li>
          <li>
            <a
              onClick={() => {
                navigate("/test");
              }}
            >
              Test page
            </a>
          </li>
          <li tabIndex={0}>
            <a>
              <div className="avatar">
                <div className="w-10 rounded-full">
                  <img src="https://placeimg.com/192/192/people" />
                </div>
              </div>
              Espace personnel
              <FaChevronDown />
            </a>
            <ul className="p-2 bg-base-100">
              <li>
                <a
                  onClick={() => {
                    navigate("/account");
                  }}
                >
                  Mon compte
                </a>
              </li>
              <li>
                <a
                  onClick={() => {
                    navigate("/formations");
                  }}
                >
                  Mes formations
                </a>
              </li>
              <li>
                <a
                  onClick={() => {
                    navigate("/logout");
                  }}
                >
                  Me d??connecter
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
}
