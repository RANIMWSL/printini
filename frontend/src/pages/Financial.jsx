import { useState } from 'react';
import { Table, Button, Card, Modal, Stack, Form } from 'react-bootstrap'; 
import './Financial.css'; 

import modif from './image/modif.png';
import supp from './image/supp.png';
import search from './image/search.png';
import { AiFillFilter } from "react-icons/ai";

import AddFinancial from './AddFinancial';
import EditFinancial from './EditFinancial';

export default function Financial() {
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [items, setItems] = useState([
    { id: 1, type: 'Wood', category: 'Brown', amount: 50, date: 'Low', notes: 'Ensure restocking' },
    { id: 2, type: 'Steel', category: 'Gray', amount: 200, date: 'High', notes: 'No issues' }
  ]);

  const handleAdd = () => {
    setShowAdd(true);
  };

  const handleEdit = (item) => {
    setCurrentItem(item);
    setShowEdit(true);
  };

  const handleDelete = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleAddItem = (newItem) => {
    setItems([...items, { ...newItem, id: items.length + 1 }]);
    setShowAdd(false);
  };

  const handleEditItem = (updatedItem) => {
    setItems(items.map(item => (item.id === updatedItem.id ? updatedItem : item)));
    setShowEdit(false);
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

      {/* Modals for Adding and Editing */}
      <AddFinancial show={showAdd} handleClose={() => setShowAdd(false)} handleAdd={handleAddItem} />
      <EditFinancial show={showEdit} handleClose={() => setShowEdit(false)} handleEdit={handleEditItem} currentItem={currentItem} />
    </div>
  );
}
