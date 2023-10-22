import React, { useState, useEffect } from "react";
import { ApiGet } from "../../Framework/useApi/useApiGet";
import { formatDate } from "fullcalendar";
import { TicketEditModal } from "./TicketEditModal";

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
  const [tickets, setTickets] = useState<TicketInterface[]>([]);
  const [newTicket, setNewTicket] = useState<TicketInterface>({
    id: 0,
    statut: { id: 0, libelle: "" },
    utilisateurId: 0,
    etablissementId: 0,
    sujet: "",
    message: "",
    dateEnvoi: null,
  });
  const [showCreate, setShowCreate] = useState(false);
  useEffect(() => {
    const fetchTickets = async () => {
      const result: TicketInterface[] = JSON.parse(
        await ApiGet("/api/tickets")
      );
      setTickets(result);
    };

    fetchTickets();
  }, []);

  const handleAddTicket = () => {
    // if (newTicket.title.trim() === "" || newTicket.content.trim() === "") {
    //   alert("Veuillez compléter les champs.");
    //   return;
    // }
    // setNewTicket({ title: "", content: "" });
    setShowCreate(false);
  };

  const handleDeleteTicket = (id: number) => {
    setTickets(tickets.filter((ticket) => ticket.id !== id));
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
    setTickets((prev) =>
      prev.map((t) => (t.id === editedTicket.id ? editedTicket : t))
    );
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
          <button className="btn btn-success" onClick={handleAddTicket}>
            Soumettre
          </button>
        </div>
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
                  Consulter
                </button>
                <button
                  className="btn btn-outline btn-error"
                  onClick={() => handleDeleteTicket(ticket.id)}
                >
                  Supprimer
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
