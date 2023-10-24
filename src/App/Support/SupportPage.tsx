import React, { useState, useEffect } from "react";
import { ApiGet } from "../../Framework/useApi/useApiGet";
import { formatDate } from "fullcalendar";
import { TicketEditModal } from "./TicketEditModal";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { ApiDelete } from "../../Framework/useApi/useApiDelete";
import { ApiPut } from "../../Framework/useApi/useApiPut.ts";
import { ApiPost } from "../../Framework/useApi/useApiPost";
import { getUserInfo } from "../Router/AppConfigRouter";

export interface TicketInterface {
  id: number;
  statut: { id: number; libelle: string };
  utilisateurId: number;
  etablissementId: number;
  sujet: string;
  message: string;
  dateEnvoi: Date | null;
}

export function SupportPage() {
  const userClean = getUserInfo();
  const [tickets, setTickets] = useState<TicketInterface[]>([]);
  const [newTicket, setNewTicket] = useState<TicketInterface>({
    id: 0,
    statut: { id: 0, libelle: "" },
    utilisateurId: userClean.id,
    etablissementId: 1,
    sujet: "",
    message: "",
    dateEnvoi: null,
  });
  const [showCreate, setShowCreate] = useState(false);
  const [refreshList, setRefreshList] = useState(0);

  useEffect(() => {
    const fetchTickets = async () => {
      const result: TicketInterface[] = await ApiGet("/api/tickets");
      setTickets(result);
    };

    fetchTickets();
  }, [refreshList]);

  const handleAddTicket = () => {
    ApiPost("/api/tickets", {
      id: newTicket.id,
      statutId: 2,
      utilisateurId: newTicket.utilisateurId,
      etablissementId: newTicket.etablissementId,
      sujet: newTicket.sujet,
      message: newTicket.message,
      dateEnvoi: newTicket.dateEnvoi,
    });
    setRefreshList((prev) => prev + 1);
    setShowCreate(false);
  };

  // * Modification d'un ticket
  const [showEditModal, setShowEditModal] = useState(false);
  const [ticketToEdit, setTicketToEdit] = useState<TicketInterface | null>(
    null
  );

  const handleEditTicket = (ticket: TicketInterface) => {
    setTicketToEdit(ticket);
    setShowEditModal(true);
  };

  const saveEditedTicket = (editedTicket: TicketInterface) => {
    ApiPut("/api/tickets/" + editedTicket.id, {
      id: editedTicket.id,
      statutId: 2,
      utilisateurId: editedTicket.utilisateurId,
      etablissementId: editedTicket.etablissementId,
      sujet: editedTicket.sujet,
      message: editedTicket.message,
      dateEnvoi: editedTicket.dateEnvoi,
    });
    setRefreshList((prev) => prev + 1);
  };

  const handleDeleteTicket = (ticket: TicketInterface) => {
    if (!ticket) return;
    ApiPut("/api/tickets/" + ticket.id, {
      statutId: 4,
      utilisateurId: ticket.utilisateurId,
      etablissementId: ticket.etablissementId,
      sujet: ticket.sujet,
      message: ticket.message,
      dateEnvoi: ticket.dateEnvoi,
    });
    setRefreshList((prev) => prev + 1);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl mb-4">Support</h1>
      <button
        className="btn btn-primary mb-4"
        onClick={() => setShowCreate(!showCreate)}
      >
        Créer un nouveau ticket
      </button>

      {showCreate && (
        <form onSubmit={handleAddTicket}>
          <div className="mb-4">
            <input
              type="text"
              className="input input-bordered w-full mb-2"
              value={newTicket?.sujet}
              onChange={(e) =>
                setNewTicket({ ...newTicket, sujet: e.target.value })
              }
              placeholder="Titre du ticket"
            />
            <textarea
              className="textarea textarea-bordered w-full mb-2"
              value={newTicket?.message}
              onChange={(e) =>
                setNewTicket({ ...newTicket, message: e.target.value })
              }
              placeholder="Contenu du ticket"
            />
            <button className="btn btn-success" type="submit">
              Soumettre
            </button>
          </div>
        </form>
      )}

      <table className="table w-full">
        <thead>
          <tr>
            <th>Titre</th>
            <th>Statut</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket.id}>
              <td>{ticket.sujet}</td>
              <td>{ticket.statut.libelle}</td>
              <td>
                {ticket.dateEnvoi ? formatDate(new Date(ticket.dateEnvoi)) : ""}
              </td>
              <td>
                <button
                  className="btn btn-outline btn-accent"
                  onClick={() => handleEditTicket(ticket)}
                >
                  <EditIcon />
                </button>
                {"‎ ‎ "}
                <button
                  className="btn btn-outline btn-error"
                  onClick={() => handleDeleteTicket(ticket)}
                >
                  <DeleteIcon />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {ticketToEdit && (
        <TicketEditModal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          ticket={ticketToEdit}
          onEdit={saveEditedTicket}
        />
      )}
    </div>
  );
}
