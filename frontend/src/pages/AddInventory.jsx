import { Modal, Form, Button } from 'react-bootstrap';
import { useState } from 'react';

export default function AddInventory({ show, handleClose, handleSubmit }) {
  const [formData, setFormData] = useState({
    materialType: '',
    color: '',
    quantity: '',
    reorderLevel: '',
    note: ''
  });

  // Gérer les changements dans les champs du formulaire
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Envoyer les données au backend
  const handleSave = (e) => {
    e.preventDefault();

    // Convertir en nombres les valeurs numériques
    const newItem = {
      ...formData,
      quantity: Number(formData.quantity),
      reorderLevel: Number(formData.reorderLevel)
    };

    fetch('http://localhost:5000/api/inventory', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newItem)
    })
      .then((res) => res.json())
      .then((data) => {
        handleSubmit(data); // Ajouter le nouvel élément à la liste
        handleClose(); // Fermer le modal
        setFormData({ materialType: '', color: '', quantity: '', reorderLevel: '', note: '' }); // Réinitialiser le formulaire
      })
      .catch((err) => console.error('Error adding inventory:', err));
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSave}>
          <Form.Group className="mb-3">
            <Form.Label>Material</Form.Label>
            <Form.Control type="text" name="materialType" value={formData.materialType} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Color</Form.Label>
            <Form.Control type="text" name="color" value={formData.color} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Quantity</Form.Label>
            <Form.Control type="number" name="quantity" value={formData.quantity} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Alert Level</Form.Label>
            <Form.Control type="number" name="reorderLevel" value={formData.reorderLevel} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Notes</Form.Label>
            <Form.Control type="text" name="note" value={formData.note} onChange={handleChange} />
          </Form.Group>
          <Button type="submit">Add Item</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
