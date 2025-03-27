import { Modal, Form, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';

export default function EditInventory({ show, handleClose, handleSubmit, item }) {
  const [formData, setFormData] = useState({
    _id: '',
    materialType: '',
    color: '',
    quantity: 0,
    reorderLevel: 0,
    note: ''
  });

  // Charger les données de l'élément sélectionné
  useEffect(() => {
    if (item) {
      setFormData({
        _id: item._id || '',
        materialType: item.materialType || '',
        color: item.color || '',
        quantity: item.quantity || 0,
        reorderLevel: item.reorderLevel || 0,
        note: item.note || ''
      });
    }
  }, [item]);

  // Gérer les changements dans les champs du formulaire
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Envoyer les données mises à jour au backend
  const handleSave = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5000/api/inventory/${formData._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          materialType: formData.materialType,
          color: formData.color,
          quantity: Number(formData.quantity),
          reorderLevel: Number(formData.reorderLevel),
          note: formData.note
        })
      });

      if (!response.ok) throw new Error('Erreur de mise à jour');

      const updatedItem = await response.json();
      handleSubmit(updatedItem); // Mettre à jour la liste dans Inventory.jsx
      handleClose(); // Fermer le modal
    } catch (err) {
      console.error('Error updating inventory:', err);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSave}>
          <Form.Group className="mb-3">
            <Form.Label>Material</Form.Label>
            <Form.Control
              type="text"
              name="materialType"
              value={formData.materialType}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Color</Form.Label>
            <Form.Control
              type="text"
              name="color"
              value={formData.color}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Reorder Level</Form.Label>
            <Form.Control
              type="number"
              name="reorderLevel"
              value={formData.reorderLevel}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Notes</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="note"
              value={formData.note}
              onChange={handleChange}
            />
          </Form.Group>
          <Button type="submit">Save Changes</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
