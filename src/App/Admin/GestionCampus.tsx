import { useEffect, useState } from "react";
import { ApiGet } from "../../Framework/useApi/useApiGet";
import { ApiPost } from "../../Framework/useApi/useApiPost";
import Button from "../../Framework/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { ApiPut } from "../../Framework/useApi/useApiPut.ts";
import { ApiDelete } from "../../Framework/useApi/useApiDelete";
import { useLoading } from "../../Framework/LoaderOverlay";
import {
  ChampRequis,
  InvalidCodePostalSize,
  InvalidPhoneInfo,
  champRequisVideBool,
  invalidCodePostalBool,
  invalidPhoneBool,
} from "../../Framework/Input/Input";

export interface CampusInterface {
  id?: number;
  libelle: string;
  numVoie: string;
  rue: string;
  ville: string;
  codePostal: number;
  numeroTel: number;
}

export async function createCampus(data: CampusInterface) {
  const { result, error } = await ApiPost("/api/etablissements", data);

  if (error) {
    console.error("Erreur lors de la création du campus:", error);
    return null;
  }
  console.log("result", result);
  return result;
}

export function EditCampusModal(props: {
  isModalCampusOpen: boolean;
  setIsModalCampusOpen: React.Dispatch<React.SetStateAction<boolean>>;
  campusSelected: CampusInterface;
  setCampusSelected: React.Dispatch<
    React.SetStateAction<CampusInterface | undefined>
  >;
  setRefreshList: React.Dispatch<React.SetStateAction<number>>;
}) {
  const {
    isModalCampusOpen,
    setIsModalCampusOpen,
    campusSelected,
    setCampusSelected,
    setRefreshList,
  } = props;

  const [formData, setFormData] = useState<CampusInterface>(campusSelected);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const result = await ApiPut("/api/etablissements/" + formData.id, {
      id: formData.id,
      libelle: formData.libelle,
      numVoie: formData.numVoie,
      rue: formData.rue,
      ville: formData.ville,
      codePostal: formData.codePostal,
      numeroTel: formData.numeroTel,
    });
    if (result) {
      setRefreshList((prev) => prev + 1);
      setIsModalCampusOpen(false);
    }
  };
  console.log(champRequisVideBool(formData.libelle));
  if (!isModalCampusOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="modal modal-open">
        <div className="modal-box">
          <h2 className="text-2xl font-semibold mb-4">Modifier Campus</h2>
          <div>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Libelle:
                </label>
                <input
                  type="text"
                  name="libelle"
                  value={formData.libelle}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                />
              </div>
              <ChampRequis fieldValue={formData.libelle} />
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Numéro de voie:
                </label>
                <input
                  type="text"
                  name="numVoie"
                  value={formData.numVoie}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                />
              </div>
              <ChampRequis fieldValue={formData.numVoie} />
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Rue:
                </label>
                <input
                  type="text"
                  name="rue"
                  value={formData.rue}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                />
              </div>
              <ChampRequis fieldValue={formData.rue} />
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Ville:
                </label>
                <input
                  type="text"
                  name="ville"
                  value={formData.ville}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                />
              </div>
              <ChampRequis fieldValue={formData.ville} />
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Code Postal:
                </label>
                <input
                  type="number"
                  name="codePostal"
                  value={formData.codePostal}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                />
              </div>
              <InvalidCodePostalSize codePostal={formData.codePostal} />
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Numéro de téléphone:
                </label>
                <input
                  type="number"
                  name="numeroTel"
                  value={formData.numeroTel}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                />
              </div>
              <InvalidPhoneInfo phone={formData.numeroTel} />
              <div className="modal-action">
                <button
                  onClick={() => {
                    setIsModalCampusOpen(false);
                    setCampusSelected(undefined);
                  }}
                  className="btn"
                >
                  Annuler
                </button>
                {"‎ ‎ "}
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={
                    // invalidCodePostalBool(formData.codePostal) ||
                    // invalidPhoneBool(formData.numeroTel) ||
                    champRequisVideBool(formData.libelle)
                    //  ||
                    // champRequisVideBool(formData.rue) ||
                    // champRequisVideBool(formData.ville) ||
                    // champRequisVideBool(formData.numVoie)
                  }
                >
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CreateCampusModal(props: {
  showModalCreateCampus: boolean;
  setShowModalCreateCampus: React.Dispatch<React.SetStateAction<boolean>>;
  setRefreshList: React.Dispatch<React.SetStateAction<number>>;
}) {
  const { setShowModalCreateCampus, showModalCreateCampus, setRefreshList } =
    props;

  const defaultData: CampusInterface = {
    libelle: "",
    numVoie: "",
    rue: "",
    ville: "",
    codePostal: 0,
    numeroTel: 0,
  };
  const [formData, setFormData] = useState<CampusInterface>(defaultData);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (!showModalCreateCampus) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="modal modal-open">
        <div className="modal-box">
          <h2 className="text-2xl font-semibold mb-4">Créer Campus</h2>
          <div>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const response = await createCampus(formData);
                if (response) {
                  setFormData(defaultData);
                  setShowModalCreateCampus(false);
                  setRefreshList((prev) => prev + 1);
                }
              }}
            >
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Libelle:
                </label>
                <input
                  type="text"
                  name="libelle"
                  value={formData.libelle}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                />
              </div>
              <ChampRequis fieldValue={formData.libelle} />
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Numéro de voie:
                </label>
                <input
                  type="text"
                  name="numVoie"
                  value={formData.numVoie}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                />
              </div>
              <ChampRequis fieldValue={formData.numVoie} />
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Rue:
                </label>
                <input
                  type="text"
                  name="rue"
                  value={formData.rue}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                />
              </div>
              <ChampRequis fieldValue={formData.rue} />
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Ville:
                </label>
                <input
                  type="text"
                  name="ville"
                  value={formData.ville}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                />
              </div>
              <ChampRequis fieldValue={formData.ville} />
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Code Postal:
                </label>
                <input
                  type="number"
                  name="codePostal"
                  value={formData.codePostal}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                />
              </div>
              <InvalidCodePostalSize codePostal={formData.codePostal} />
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Numéro de téléphone:
                </label>
                <input
                  type="number"
                  name="numeroTel"
                  value={formData.numeroTel}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                />
              </div>
              <InvalidPhoneInfo phone={formData.numeroTel} />
              <div className="modal-action">
                <button
                  onClick={() => {
                    setFormData(defaultData);
                    setShowModalCreateCampus(false);
                  }}
                  className="btn"
                >
                  Annuler
                </button>
                {"‎ ‎ "}
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={
                    invalidCodePostalBool(formData.codePostal) ||
                    invalidPhoneBool(formData.numeroTel) ||
                    champRequisVideBool(formData.libelle) ||
                    champRequisVideBool(formData.rue) ||
                    champRequisVideBool(formData.ville) ||
                    champRequisVideBool(formData.numVoie)
                  }
                >
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CampusListCard() {
  // * States
  const openModalCreateCampus = () => setShowModalCreateCampus(true);
  const [campusList, setCampus] = useState<CampusInterface[]>([]);
  const [showModalCreateCampus, setShowModalCreateCampus] =
    useState<boolean>(false);
  const [campusSelected, setCampusSelected] = useState<
    CampusInterface | undefined
  >(undefined);
  const [isModalCampusOpen, setIsModalCampusOpen] = useState(false);
  const [refreshList, setRefreshList] = useState(0);
  const { setLoading } = useLoading();

  useEffect(() => {
    async function loadData() {
      const loadedCampus: CampusInterface[] = await ApiGet(
        "/api/etablissements",
        setLoading
      );
      console.log("loadedCampus", loadedCampus);
      setCampus(loadedCampus);
    }
    loadData();
  }, [refreshList]);

  // * Fonctions
  const handleModifierCampus = (campusSelected: CampusInterface) => {
    if (!campusSelected) return;
    setCampusSelected(campusSelected);
    setIsModalCampusOpen(true);
  };

  const handleSupprimerCampus = (campusSelected: CampusInterface) => {
    if (!campusSelected) return;
    if (!window.confirm("êtes vous sur de vouloir supprimer ce campus ?"))
      return;
    ApiDelete("/api/etablissements/" + campusSelected.id);
    setRefreshList((prev) => prev + 1);
  };
  return (
    <div className="card">
      <div className="card-header">
        <h2>Gestion des Campus</h2>
        <button
          className="btn btn-primary"
          onClick={() => {
            openModalCreateCampus();
          }}
        >
          Ajouter un campus
        </button>
      </div>
      <div className="card-content">
        <div className="bidule">
          <table className="table w-full table-scrollable">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Ville</th>
                <th className="action-column">Action</th>
              </tr>
            </thead>
            <tbody>
              {campusList &&
                campusList.map((campus) => (
                  <tr key={campus.id}>
                    <td>{campus.libelle}</td>
                    <td>{campus.ville}</td>
                    <td className="action-column">
                      {campus.id !== 1 && (
                        <>
                          <button
                            className="btn btn-outline btn-accent"
                            onClick={() => handleModifierCampus(campus)}
                          >
                            <EditIcon />
                          </button>
                          {"‎ ‎ "}
                          <button
                            className="btn btn-outline btn-error"
                            onClick={() => handleSupprimerCampus(campus)}
                          >
                            <DeleteIcon />
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <CreateCampusModal
          showModalCreateCampus={showModalCreateCampus}
          setShowModalCreateCampus={setShowModalCreateCampus}
          setRefreshList={setRefreshList}
        />
        {campusSelected && (
          <EditCampusModal
            isModalCampusOpen={isModalCampusOpen}
            setIsModalCampusOpen={setIsModalCampusOpen}
            campusSelected={campusSelected}
            setCampusSelected={setCampusSelected}
            setRefreshList={setRefreshList}
          />
        )}
      </div>
    </div>
  );
}
