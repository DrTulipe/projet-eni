import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./Calendar.css";
import frLocale from "@fullcalendar/core/locales/fr";
import { Container } from "../../Framework/Container/Container";
import { FilterToolBarPlanning } from "./FilterToolBarPlanning";
import { PlanningCreateEvent } from "./PlanningCreateEvent";
import { ApiGet } from "../../Framework/useApi/useApiGet";

export interface EvenementInterface {
  id: number;
  moduleFormation: { id: number; libelle: string };
  utilisateur: { id: number; nom: string; prenom: string };
  classe: { id: number; libelle: string };
  salle: { id: number; libelle: string };
  dateDebut: Date;
  dateFin: Date;
  statut: { id: number; libelle: string };
  estAcceptee?: boolean;
}

export function Planning() {
  const token = localStorage.getItem("token");
  const [isModalOpen, setModalOpen] = useState(false);
  const [isModalEditOpen, setModalEditOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<EvenementInterface | null>(
    null
  );
  const [refreshCount, setRefreshCount] = useState(0);

  const handleRefresh = () => {
    setRefreshCount((prev) => prev + 1);
  };
  const handleDateClick = (arg: any) => {
    setSelectedDate(arg.date);
    setModalOpen(true);
  };

  const handleDeleteFormation = async () => {
    if (!selectedEvent || !selectedEvent.id) {
      console.error("Pas d'évenement sélectionné");
      return;
    }
    if (!window.confirm("Êtes vous sur de vouloir supprimer cette formation ?"))
      return;
    const route = "/api/sessions/" + selectedEvent.id;
    try {
      const response = await fetch(route, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error deleting the formation");
      }
      handleRefresh();
      setSelectedEvent(null);
      setModalOpen(false);
    } catch (error) {
      console.error("Error deleting the formation:", error);
      alert(
        "An error occurred while deleting the formation. Please try again."
      );
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedDate(null);
  };

  const handleCloseModalEdit = () => {
    setModalEditOpen(false);
    setSelectedEvent(null);
  };

  const handleEventClick = (info: any) => {
    setSelectedEvent(info.event.extendedProps);
    setModalEditOpen(true);
  };

  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    const fetchEvents = async (filters: any) => {
      let queryParams = "";
      if (
        filters.etablissementId ||
        filters.classeId ||
        filters.utilisateurId
      ) {
        queryParams += "/filtres?";
        if (filters.etablissementId && filters.etablissementId !== -1) {
          queryParams += `etablissementId=${filters.etablissementId}&`;
        }
        if (filters.classeId && filters.classeId !== -1) {
          queryParams += `classeId=${filters.classeId}&`;
        }
        if (filters.utilisateurId && filters.utilisateurId !== -1) {
          queryParams += `utilisateurId=${filters.utilisateurId}&`;
        }
      }

      const result: EvenementInterface[] = await ApiGet(
        `/api/sessions${queryParams}`
      );
      const eventsForFullCalendar = convertToFullCalendarEvents(result);
      setEvents(eventsForFullCalendar);
    };
    fetchEvents(refreshCount);
  }, [refreshCount]);

  return (
    <Container>
      <div className="w-full">
        <FilterToolBarPlanning setRefreshCount={setRefreshCount} />
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          themeSystem="standard"
          locale={frLocale}
          events={events}
          eventClick={handleEventClick}
          eventColor="#378006"
          dateClick={handleDateClick}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,dayGridWeek",
          }}
          eventClassNames="rounded shadow"
          eventContent={renderEventContent}
        />

        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="modal modal-open">
              <div className="modal-box">
                <h2 className="text-xl">
                  Ajouter un évènement pour le{" "}
                  {selectedDate && selectedDate.toLocaleDateString()}
                </h2>
                <PlanningCreateEvent
                  onSubmit={(eventData: any) => {
                    handleCloseModal();
                  }}
                  onClose={handleCloseModal}
                  selectedDate={selectedDate}
                />
              </div>
            </div>
          </div>
        )}
        {isModalEditOpen && selectedEvent && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="modal modal-open">
              <div className="modal-box">
                <h2 className="text-xl">Détails de l'événement</h2>
                <div>
                  Module de formation: {selectedEvent.moduleFormation.libelle}
                </div>
                <div>
                  Formateur: {selectedEvent.utilisateur.nom}{" "}
                  {selectedEvent.utilisateur.prenom}
                </div>
                <div>Classe: {selectedEvent.classe.libelle}</div>
                <div>Salle: {selectedEvent.salle.libelle}</div>
                <div className="flex justify-end mt-4">
                  <button
                    onClick={handleCloseModalEdit}
                    className="btn btn-secondary"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={handleDeleteFormation}
                    className="btn btn-secondary"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
}

function renderEventContent(eventInfo: any) {
  return {
    html: eventInfo.event.title,
  };
}

function convertToFullCalendarEvents(data: EvenementInterface[]): any[] {
  if (!data) return [];
  return data.map((event) => ({
    id: event.id,
    title: `
      <div class="bg-blue-500 text-white p-2 rounded">
        <b>${event.moduleFormation.libelle}</b>
        <div class="text-sm mt-1">Formateur: ${event.utilisateur.nom} ${event.utilisateur.prenom}</div>
        <div class="text-sm">Classe: ${event.classe.libelle}</div>
        <div class="text-sm">Salle: ${event.salle.libelle}</div>
      </div>
    `,
    start: new Date(event.dateDebut),
    end: new Date(event.dateFin),
    extendedProps: {
      id: event.id,
      moduleFormation: event.moduleFormation,
      utilisateur: event.utilisateur,
      classe: event.classe,
      salle: event.salle,
    },
  }));
}
