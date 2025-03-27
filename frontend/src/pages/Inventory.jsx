import { useState, useEffect } from 'react';
import { Table, Button, Card, Form } from 'react-bootstrap';
import Stack from 'react-bootstrap/Stack';
import { AiFillFilter } from "react-icons/ai";
import plus from './image/plus.png';
import moin from './image/moin.png';
import modif from './image/modif.png';
import supp from './image/supp.png';
import "bootstrap/dist/css/bootstrap.min.css";
import './Inventory.css';
import AddInventory from './AddInventory';
import EditInventory from './EditInventory';

export default function Inventory() {
  const [items, setItems] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // Charger les articles depuis le backend
  useEffect(() => {
    fetch('http://localhost:5000/api/inventory')
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((err) => console.error('Error fetching inventory:', err));
  }, []);

  // Ouvrir le modal d'ajout
  const handleShowAdd = () => {
    setEditingItem(null);
    setShowAddModal(true);
  };

  // Ouvrir le modal d'édition
  const handleShowEdit = (item) => {
    setEditingItem(item);
    setShowEditModal(true);
  };

  // Fermer les modals
  const handleCloseAdd = () => setShowAddModal(false);
  const handleCloseEdit = () => setShowEditModal(false);

  // Ajouter un nouvel article
  const handleAdd = (newItem) => {
    fetch('http://localhost:5000/api/inventory', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newItem),
    })
      .then((res) => res.json())
      .then((data) => setItems([...items, data]))
      .catch((err) => console.error('Error adding inventory:', err));
  };

  // Mettre à jour un article
  const handleEdit = (updatedItem) => {
    fetch(`http://localhost:5000/api/inventory/${updatedItem._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedItem),
    })
      .then((res) => res.json())
      .then((data) => {
        setItems(items.map((item) => (item._id === data._id ? data : item)));
        handleCloseEdit();
      })
      .catch((err) => console.error('Error updating inventory:', err));
  };

  // Supprimer un article
  const handleDelete = (id) => {
    fetch(`http://localhost:5000/api/inventory/${id}`, { method: 'DELETE' })
      .then(() => setItems(items.filter((item) => item._id !== id)))
      .catch((err) => console.error('Error deleting inventory:', err));
  };

  // Incrémenter la quantité
  const handleIncrement = (id) => {
    const item = items.find((item) => item._id === id);
    handleEdit({ ...item, quantity: item.quantity + 1 });
  };

  // Décrémenter la quantité
  const handleDecrement = (id) => {
    const item = items.find((item) => item._id === id);
    if (item.quantity > 0) {
      handleEdit({ ...item, quantity: item.quantity - 1 });
    }
  };

  return (
    <div className="inventory">
      <Stack direction="horizontal" gap={3}>
        <div className="p-2">
          <h1 style={{ color: "#667eea" }}>Inventory</h1>
        </div>
        <div className="p-2 ms-auto">
          <Button variant="outline-dark" onClick={handleShowAdd}>Add</Button>
        </div>
      </Stack>

      <Stack direction="horizontal" gap={3} className="my-3">
        <Form.Control className="me-auto" placeholder="Search..." />
        <AiFillFilter />
      </Stack>

      <Card className="shadow-sm p-4 mt-3">
        <Card.Body>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Material</th>
                <th>Color</th>
                <th>Quantity</th>
                <th>Alert Level</th>
                <th>Notes</th>
                <th colSpan="4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id}>
                  <td>{item.materialType}</td>
                  <td>{item.color}</td>
                  <td>{item.quantity}</td>
                  <td>{item.reorderLevel}</td>
                  <td>{item.note}</td>
                  <td>
                    <img src={plus} className='plusmoin' alt="plus" onClick={() => handleIncrement(item._id)} />
                  </td>
                  <td>
                    <img src={moin} className='plusmoin' alt="minus" onClick={() => handleDecrement(item._id)} />
                  </td>
                  <td>
                    <img src={modif} className='modif' alt="modify" onClick={() => handleShowEdit(item)} />
                  </td>
                  <td>
                    <img src={supp} className='supp' alt="delete" onClick={() => handleDelete(item._id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Modal pour ajouter un article */}
      <AddInventory show={showAddModal} handleClose={handleCloseAdd} handleSubmit={handleAdd} />

      {/* Modal pour éditer un article */}
      {editingItem && (
        <EditInventory show={showEditModal} handleClose={handleCloseEdit} handleSubmit={handleEdit} item={editingItem} />
      )}
    </div>
  );
}
