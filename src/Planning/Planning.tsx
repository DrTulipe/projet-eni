import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "./Calendar.css";
import frLocale from "@fullcalendar/core/locales/fr";

import { Container } from "../Framework/Container/Container";
import { FilterToolBarPlanning } from "./FilterToolBarPlanning";

export function Planning() {
  return (
    <Container>
      <div className="w-full">
        <FilterToolBarPlanning />
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          themeSystem="standard"
          locale={frLocale}
          eventColor="#378006"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,dayGridWeek",
          }}
        />
      </div>
    </Container>
  );
}
