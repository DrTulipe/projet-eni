import React, { useState, useEffect } from "react";
import { fetchCampus, createCampus } from "./GestionCampus";
import { fetchClasses, createClass } from "./GestionClasses";
import { fetchFormateurs, createFormateur } from "./GestionFormateurs";
import "./admin.css";
import Button from "../Framework/Button";

export function AdminPanel() {
  const [formateurs, setFormateurs] = useState<any[]>([]);
  const [classes, setClasses] = useState<any[]>([]);
  const [campus, setCampus] = useState<any[]>([]);

  useEffect(() => {
    async function loadData() {
      const loadedFormateurs = await fetchFormateurs();
      const loadedClasses = await fetchClasses();
      const loadedCampus = await fetchCampus();

      setFormateurs(loadedFormateurs);
      setClasses(loadedClasses);
      setCampus(loadedCampus);
    }

    loadData();
  }, []);

  const handleSubmitFormateur = async (data: any) => {
    const newFormateur = await createFormateur(data);
    setFormateurs((prev) => [...prev, newFormateur]);
  };

  const handleSubmitClass = async (data: any) => {
    const newClass = await createClass(data);
    setClasses((prev) => [...prev, newClass]);
  };

  const handleSubmitCampus = async (data: any) => {
    const newCampus = await createCampus(data);
    setCampus((prev) => [...prev, newCampus]);
  };

  return (
    <div className="admin-container">
      <h1><b>Panneau Administrateur</b></h1>
      <div className="admin-panel">
        <div className="card">
          <div className="card-header">
            <h2>Gestion des Formateurs</h2>
            <Button
              onClick={() => {
                /* code pour ajouter un formateur */
              }}
            >
              Ajouter un formateur
            </Button>
          </div>
          <div className="card-content">
            {formateurs.map((formateur) => (
              <div key={formateur.id}>
                {/* Affichez les détails du formateur */}
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h2>Gestion des Classes</h2>
            <Button
              onClick={() => {
                /* code pour ajouter une classe */
              }}
            >
              Ajouter une classe
            </Button>
          </div>
          <div className="card-content">
            {classes.map((cls) => (
              <div key={cls.id}>{/* Affichez les détails de la classe */}</div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h2>Gestion des Campus</h2>
            <Button
              onClick={() => {
                /* code pour ajouter un campus */
              }}
            >
              Ajouter un campus
            </Button>
          </div>
          <div className="card-content">
            {campus.map((c) => (
              <div key={c.id}>{/* Affichez les détails du campus */}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
