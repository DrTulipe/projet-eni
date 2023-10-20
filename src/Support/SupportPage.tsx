import React, { useState, useEffect } from "react";

export function SupportPage() {
  const [tickets, setTickets] = useState<any[]>([]);
  const [newTicket, setNewTicket] = useState({ title: "", content: "" });
  const [showCreate, setShowCreate] = useState(false);

  useEffect(() => {
    // Simulation d'un appel API
    // Bien sûr, dans une application réelle, vous récupérerez ceci depuis un endpoint.
    setTickets([
      {
        id: 1,
        title: "Problème de connexion",
        content: "Je ne peux pas me connecter à mon compte.",
        status: "Ouvert",
      },
      {
        id: 2,
        title: "Bug affichage",
        content: "L'affichage est déformé sur mobile.",
        status: "En cours",
      },
    ]);
  }, []);

  const handleAddTicket = () => {
    if (newTicket.title.trim() === "" || newTicket.content.trim() === "") {
      alert("Veuillez compléter les champs.");
      return;
    }

    const nextId = tickets.length > 0 ? tickets[tickets.length - 1].id + 1 : 1;
    setTickets([...tickets, { ...newTicket, id: nextId, status: "Ouvert" }]);
    setNewTicket({ title: "", content: "" });
    setShowCreate(false);
  };

  const handleDeleteTicket = (id: number) => {
    setTickets(tickets.filter((ticket) => ticket.id !== id));
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
            value={newTicket.title}
            onChange={(e) =>
              setNewTicket({ ...newTicket, title: e.target.value })
            }
            placeholder="Titre du ticket"
          />
          <textarea
            className="textarea textarea-bordered w-full mb-2"
            value={newTicket.content}
            onChange={(e) =>
              setNewTicket({ ...newTicket, content: e.target.value })
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
            <th>Contenu</th>
            <th>Statut</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket.id}>
              <td>{ticket.title}</td>
              <td>{ticket.content}</td>
              <td>{ticket.status}</td>
              <td>
                  <button
                    className="btn btn-outline btn-accent"
                    onClick={() => alert("Consulter")}
                  >
                    Consulter
                  </button>
                <button
                  className="btn btn-outline btn-primary"
                  onClick={() => alert("Modifier")}
                >
                  Modifier
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
    </div>
  );
}
