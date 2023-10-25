import { useEffect, useState } from "react";
import { ApiGet } from "../../Framework/useApi/useApiGet";
import { ApiPost } from "../../Framework/useApi/useApiPost";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Button from "../../Framework/Button";
import { ApiPut } from "../../Framework/useApi/useApiPut.ts";
import { selectClasses } from "@mui/material";
import { ApiDelete } from "../../Framework/useApi/useApiDelete";
import { useLoading } from "../../Framework/LoaderOverlay";

export interface ClasseInterface {
  id: number;
  libelle: string;
  nombreEleves: number;
  cursusId?: number;
}

export function ClasseList() {
  const [classes, setClasses] = useState<ClasseInterface[]>([]);
  const [classeSelected, setClasseSelected] = useState<ClasseInterface>({
    id: 0,
    libelle: "",
    nombreEleves: 0,
    cursusId: 1,
  });
  const [refreshList, setRefreshList] = useState<number>(0);
  const [showModalClasse, setShowModalClasse] = useState<boolean>(false);
  const [showModalClasseEdit, setShowModalClasseEdit] =
    useState<boolean>(false);
    const { setLoading } = useLoading();

  useEffect(() => {
    async function loadData() {
      const loadedClasses = await ApiGet("/api/classes", setLoading);
      setClasses(loadedClasses);
    }

    loadData();
  }, [refreshList]);

  const handleModifierClasse = (classe: ClasseInterface) => {
    setShowModalClasseEdit(true);
    setClasseSelected(classe);
  };

  const handleEditClasseSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    ApiPut("/api/classes/" + classeSelected?.id, {
      libelle: classeSelected?.libelle,
      nombreEleves: classeSelected?.nombreEleves,
      cursusId: 1,
    });
    setShowModalClasseEdit(false);
    setRefreshList((prev) => prev + 1);
  };

  const handleSupprimerClasse = (id: number) => {
    if (!window.confirm("Êtes vous sur de vouloir supprimer cette classe ?"))
      return;
    ApiDelete("/api/classes/" + id);
    setRefreshList((prev) => prev + 1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setClasseSelected((prev) => ({ ...prev, [name]: value }));
  };

  const openModalCreateClasse = () => setShowModalClasse(true);
  const closeModalCreateClasse = () => setShowModalClasse(false);

  return (
    <div className="card">
      <div className="card-header">
        <h2>Gestion des Classes</h2>
        <button className="btn btn-primary"
          onClick={() => {
            openModalCreateClasse();
          }}
        >
          Ajouter une classe
        </button>
      </div>
      <div className="card-content">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Nombre d'élèves</th>
              <th className="action-column">Action</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((classe) => (
              <tr key={classe.id}>
                <td>{classe.libelle}</td>
                <td>{classe.nombreEleves}</td>
                <td className="action-column">
                  <button
                    className="btn btn-outline btn-accent"
                    onClick={() => handleModifierClasse(classe)}
                  >
                    <EditIcon />
                  </button>
                  {"‎ ‎ "}
                  <button
                    className="btn btn-outline btn-error"
                    onClick={() => handleSupprimerClasse(classe.id)}
                  >
                    <DeleteIcon />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showModalClasseEdit && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="modal modal-open">
            <div className="modal-box">
              <h2 className="text-xl">Modifier une classe</h2>
              <div>
                <form onSubmit={handleEditClasseSubmit}>
                  <div className="mb-4">
                    <label
                      className="block text-sm font-medium mb-2"
                      htmlFor="event-title"
                    >
                      Nom de la classe
                    </label>
                    <input
                      type="text"
                      id="libelle-classe"
                      name="libelle"
                      value={classeSelected?.libelle}
                      onChange={handleInputChange}
                      className="border p-2 w-full"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-sm font-medium mb-2"
                      htmlFor="event-title"
                    >
                      Nombre de places
                    </label>
                    <input
                      type="text"
                      name="nombreEleves"
                      id="places"
                      value={classeSelected?.nombreEleves}
                      onChange={handleInputChange}
                      className="border p-2 w-full"
                      required
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        setShowModalClasseEdit(false);
                      }}
                      className="btn btn-outline mr-2"
                    >
                      Annuler
                    </button>
                  {"‎ ‎ "}
                    <button type="submit" className="btn btn-primary">
                      Enregistrer
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      {showModalClasse && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="modal modal-open">
            <div className="modal-box">
              <h2 className="text-xl">Ajouter une classe</h2>
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  const response = await ApiPost(
                    "/api/classes",
                    classeSelected
                  );
                  if (response) {
                    setShowModalClasse(false);
                    setRefreshList((prev) => prev + 1);
                  }
                }}
              >
                <div className="mb-4">
                  <label
                    className="block text-sm font-medium mb-2"
                    htmlFor="event-title"
                  >
                    Nom de la classe
                  </label>
                  <input
                    type="text"
                    id="libelle-classe"
                    name="libelle"
                    value={classeSelected.libelle}
                    onChange={handleInputChange}
                    className="border p-2 w-full"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-sm font-medium mb-2"
                    htmlFor="event-title"
                  >
                    Nombre de places
                  </label>
                  <input
                    type="number"
                    id="places"
                    value={classeSelected.nombreEleves}
                    name="nombreEleves"
                    onChange={handleInputChange}
                    className="border p-2 w-full"
                    required
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={closeModalCreateClasse}
                    className="btn btn-outline mr-2"
                  >
                    Annuler
                  </button>
                  {"‎ ‎ "}
                  <button type="submit" className="btn btn-primary">
                    Ajouter
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
