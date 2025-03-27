import { useState } from 'react';
import { Table, Button, Form, Card, Modal, Stack } from 'react-bootstrap'; 
import './Financial.css'; 

import modif from './image/modif.png';
import supp from './image/supp.png';
import search from './image/search.png';
import { AiFillFilter } from "react-icons/ai";

export default function Financial() {
  const [show, setShow] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [items, setItems] = useState([
    { id: 1, type: 'Wood', category: 'Brown', amount: 50, date: 'Low', notes: 'Ensure restocking' },
    { id: 2, type: 'Steel', category: 'Gray', amount: 200, date: 'High', notes: 'No issues' }
  ]);

  // Ouvrir le formulaire pour ajouter un nouvel élément
  const handleAdd = () => {
    setCurrentItem(null);
    setShow(true);
  };

  // Ouvrir le formulaire avec les données d'un élément existant
  const handleEdit = (item) => {
    setCurrentItem(item);
    setShow(true);
  };

  // Supprimer un élément de la liste
  const handleDelete = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  // Gérer la soumission du formulaire
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newItem = {
      id: currentItem ? currentItem.id : items.length + 1,
      type: formData.get("type"),
      category: formData.get("category"),
      amount: formData.get("amount"),
      date: formData.get("date"),
      notes: formData.get("notes"),
    };

    if (currentItem) {
      // Mise à jour de l'élément existant
      setItems(items.map(item => (item.id === currentItem.id ? newItem : item)));
    } else {
      // Ajout d'un nouvel élément
      setItems([...items, newItem]);
    }

    setShow(false);
  };

  return (
    <div className="Financial">
      <Stack direction="horizontal" gap={3}>
        <div className="p-2">
          <h1 style={{ color: "#667eea" }}>Financial Monitoring</h1>
        </div>
        <div className="p-2 ms-auto">
          <Button variant="outline-dark" onClick={handleAdd}>Add</Button>
        </div>
        <div className="p-2">
          <Button variant="outline-dark">Print</Button>
        </div>
      </Stack>

      <Stack direction="horizontal" gap={3} className="my-3">
        <Form.Control className="me-auto" placeholder="Search..." />
        <AiFillFilter />
        <img src={search} className='search' alt="Search" />
      </Stack>

      <Card className="shadow-sm p-4">
        <Card.Body>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Ref</th>
                <th>Type</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Notes</th>
                <th colSpan="2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.type}</td>
                  <td>{item.category}</td>
                  <td>{item.amount}</td>
                  <td>{item.date}</td>
                  <td>{item.notes}</td>
                  <td>
                    <img src={modif} className='modif' alt="Edit" onClick={() => handleEdit(item)} />
                   </td>
                   <td> 
                    <img src={supp} className='supp' alt="Delete" onClick={() => handleDelete(item.id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Formulaire Modal */}
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{currentItem ? "Edit Item" : "Add Item"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Type</Form.Label>
              <Form.Control name="type" defaultValue={currentItem?.type || ''} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control name="category" defaultValue={currentItem?.category || ''} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Amount</Form.Label>
              <Form.Control type="number" name="amount" defaultValue={currentItem?.amount || ''} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control name="date" defaultValue={currentItem?.date || ''} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Notes</Form.Label>
              <Form.Control as="textarea" name="notes" defaultValue={currentItem?.notes || ''} />
            </Form.Group>
            <Button variant="primary" type="submit">
              {currentItem ? "Save Changes" : "Add Item"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
