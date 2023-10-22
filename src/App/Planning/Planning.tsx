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
  utilisateur: { id: number; nom: string, prenom: string };
  classe: { id: number; libelle: string };
  salle: { id: number; libelle: string };
  dateDebut: Date;
  dateFin: Date;
  statut: { id: number; libelle: string };
}

export function Planning() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateClick = (arg: any) => {
    setSelectedDate(arg.date);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedDate(null);
  };

  const [events, setEvents] = useState<any[]>([]); // Nouvel état pour stocker les événements

  useEffect(() => {
    const fetchEvents = async () => {
      const result: EvenementInterface[] = await ApiGet("/api/sessions");
      const eventsForFullCalendar = convertToFullCalendarEvents(result);
      setEvents(eventsForFullCalendar);
    };
    fetchEvents();
  }, []);

  return (
    <Container>
      <div className="w-full">
        <FilterToolBarPlanning />
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          themeSystem="standard"
          locale={frLocale}
          events={events}
          eventColor="#378006"
          dateClick={handleDateClick}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,dayGridWeek",
          }}
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
                    console.log(eventData);
                    // Ici, vous pouvez appeler votre API ou autre logique pour sauvegarder l'événement
                    handleCloseModal();
                  }}
                  onClose={handleCloseModal}
                  selectedDate={selectedDate}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
}

function convertToFullCalendarEvents(data: EvenementInterface[]): any[] {
  if (!data) return [];
  return data.map((event) => ({
    id: event.id,
    title: event.moduleFormation.libelle,
    start: new Date(event.dateDebut),
    end: new Date(event.dateFin),
    extendedProps: {
      moduleFormation: event.moduleFormation,
      utilisateur: event.utilisateur,
      classe: event.classe,
      salle: event.salle,
    },
  }));
}
