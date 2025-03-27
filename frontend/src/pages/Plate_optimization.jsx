import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Stack, Modal } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function PlateOptimization() {
  const [selectedTickets, setSelectedTickets] = useState([]);
  const [printer, setPrinter] = useState("");
  const [optimizationGoal, setOptimizationGoal] = useState("");
  const [optimizedPlates, setOptimizedPlates] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [printers, setPrinters] = useState([
    { name: "Printer A", size: "250mm x 250mm" },
    { name: "Printer B", size: "300mm x 300mm" },
  ]);
  const [newPrinter, setNewPrinter] = useState({ name: "", size: "" });

  const tickets = [
    { id: 1, name: "Ticket #101", material: "PLA", time: "2h30m" },
    { id: 2, name: "Ticket #102", material: "ABS", time: "4h10m" },
    { id: 3, name: "Ticket #103", material: "PETG", time: "3h00m" },
  ];

  const goals = [
    "Minimize Filament Changes",
    "Balance Workload",
    "Minimize Total Print Time",
  ];

  const toggleTicketSelection = (id) => {
    setSelectedTickets((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const addPrinter = () => {
    if (!newPrinter.name || !newPrinter.size) {
      alert("Veuillez remplir tous les champs pour ajouter une imprimante.");
      return;
    }
    setPrinters([...printers, newPrinter]);
    setNewPrinter({ name: "", size: "" });
    setShowModal(false); // Fermer la fenêtre après l'ajout
  };

  const generateOptimization = () => {
    if (!printer || !optimizationGoal || selectedTickets.length === 0) {
      alert("Veuillez sélectionner au moins un ticket, une imprimante et un objectif.");
      return;
    }
    const newPlates = selectedTickets.map((id, index) => ({
      plate: `Plate ${index + 1}`,
      printer,
      material: tickets.find((t) => t.id === id)?.material,
      time: tickets.find((t) => t.id === id)?.time,
    }));
    setOptimizedPlates(newPlates);
  };

  return (
    <div className="container mt-4">
     
      <Container>
      <Row>
        <Col>   <h1 style={{ color: "#667eea" }}>Plate Optimization System</h1></Col>
       
        <Col xs lg="2">
        <Button variant="outline-dark" onClick={() => setShowModal(true)}>
         addPrinter          </Button>
        </Col>
      </Row>
    </Container>

      {/* MODAL POUR AJOUTER UNE IMPRIMANTE */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter une Imprimante</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            className="form-control mb-2"
            type="text"
            placeholder="Nom de l'imprimante"
            value={newPrinter.name}
            onChange={(e) => setNewPrinter({ ...newPrinter, name: e.target.value })}
          />
          <input
            className="form-control mb-2"
            type="text"
            placeholder="Taille de l'imprimante (ex: 300mm x 300mm)"
            value={newPrinter.size}
            onChange={(e) => setNewPrinter({ ...newPrinter, size: e.target.value })}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Annuler
          </Button>
          <Button variant="primary" onClick={addPrinter}>
            Ajouter
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Sélection des Tickets */}
      <div className="card my-3">
        <div className="card-header">Sélectionner les Tickets Kanban</div>
        <div className="card-body">
          {tickets.map((ticket) => (
            <label key={ticket.id} className="list-group-item">
              <input
                className="form-check-input me-2"
                type="checkbox"
                checked={selectedTickets.includes(ticket.id)}
                onChange={() => toggleTicketSelection(ticket.id)}
              />
              {ticket.name} - {ticket.material} - {ticket.time}
            </label>
          ))}
        </div>
      </div>

      {/* Paramètres d'Optimisation */}
      <div className="card my-3">
        <div className="card-header">Paramètres d'Optimisation</div>
        <div className="card-body">
          <div className="mb-2">
            <label className="form-label">Sélectionner une Imprimante</label>
            <select className="form-select" onChange={(e) => setPrinter(e.target.value)}>
              <option value="">-- Choisir une imprimante --</option>
              {printers.map((p, index) => (
                <option key={index} value={p.name}>
                  {p.name} - {p.size}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-2">
            <label className="form-label">Objectif d'Optimisation</label>
            <select className="form-select" onChange={(e) => setOptimizationGoal(e.target.value)}>
              <option value="">-- Choisir un objectif --</option>
              {goals.map((goal, index) => (
                <option key={index} value={goal}>
                  {goal}
                </option>
              ))}
            </select>
          </div>
          <button className="btn outline-dark w-100"  onClick={generateOptimization}>
            Générer les Plaques Optimisées
          </button>
        </div>
      </div>

      {/* Résultats de l'Optimisation */}
      {optimizedPlates.length > 0 && (
        <div className="card my-3">
          <div className="card-header">Résultats de l'Optimisation</div>
          <div className="card-body">
            <table className="table">
              <thead>
                <tr>
                  <th>Plate #</th>
                  <th>Imprimante</th>
                  <th>Matériau</th>
                  <th>Temps Estimé</th>
                </tr>
              </thead>
              <tbody>
                {optimizedPlates.map((plate, index) => (
                  <tr key={index}>
                    <td>{plate.plate}</td>
                    <td>{plate.printer}</td>
                    <td>{plate.material}</td>
                    <td>{plate.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <button className="btn btn-success w-100">Confirmer & Envoyer à l'Imprimante</button>
    </div>
  );
}
