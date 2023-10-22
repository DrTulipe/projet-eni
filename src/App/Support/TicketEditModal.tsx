import React, { useState, useEffect } from "react";
import { TicketInterface } from "./SupportPage";

interface TicketEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  ticket: TicketInterface;
  onEdit: (editedTicket: TicketInterface) => void;
}

export function TicketEditModal({
  isOpen,
  onClose,
  ticket,
  onEdit,
}: TicketEditModalProps) {
  const [formData, setFormData] = useState<TicketInterface>(ticket);

  useEffect(() => {
    setFormData(ticket);
  }, [ticket]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="modal modal-open">
        <div className="modal-box">
          <h2 className="text-2xl font-semibold mb-4">Modifier Ticket</h2>
          <div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                onEdit(formData);
              }}
            >
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Titre:
                </label>
                <input
                  type="text"
                  name="sujet"
                  value={formData.sujet}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Message:
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleTextareaChange}
                  className="textarea textarea-bordered w-full"
                ></textarea>
              </div>
            </form>
          </div>
          <div className="modal-action">
            <button onClick={onClose} className="btn">
              Annuler
            </button>
            <button
              onClick={() => {
                onEdit(formData);
                onClose();
              }}
              className="btn btn-primary"
            >
              Enregistrer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
