import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const AddTask = ({ show, handleClose, setColumns, columns }) => {
  const [newTicket, setNewTicket] = useState({
    title: "",
    description: "",
    materialType: "",
    printSpecs: "",
    cost: "",
    sellPrice: "",
    imageUrl: "",
    deadline: "",
    itemsPacks: "",
    contactInfo: { name: "", phone: "", email: "" }
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTicket({ ...newTicket, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewTicket({ ...newTicket, imageUrl: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const addTicket = () => {
    setColumns({
      ...columns,
      todo: { ...columns.todo, tasks: [...columns.todo.tasks, newTicket] }
    });
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Ticket</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group><Form.Label>Title</Form.Label><Form.Control type="text" name="title" value={newTicket.title} onChange={handleInputChange} /></Form.Group>
          <Form.Group><Form.Label>Description</Form.Label><Form.Control as="textarea" name="description" value={newTicket.description} onChange={handleInputChange} /></Form.Group>
          <Form.Group><Form.Label>Material Type</Form.Label><Form.Control type="text" name="materialType" value={newTicket.materialType} onChange={handleInputChange} /></Form.Group>
          <Form.Group><Form.Label>Print Specifications</Form.Label><Form.Control type="text" name="printSpecs" value={newTicket.printSpecs} onChange={handleInputChange} /></Form.Group>
          <Form.Group><Form.Label>Cost</Form.Label><Form.Control type="text" name="cost" value={newTicket.cost} onChange={handleInputChange} /></Form.Group>
          <Form.Group><Form.Label>Sell Price</Form.Label><Form.Control type="text" name="sellPrice" value={newTicket.sellPrice} onChange={handleInputChange} /></Form.Group>
          <Form.Group><Form.Label>Deadline</Form.Label><Form.Control type="date" name="deadline" value={newTicket.deadline} onChange={handleInputChange} /></Form.Group>
          <Form.Group><Form.Label>Image</Form.Label><Form.Control type="file" accept="image/*" onChange={handleImageUpload} /></Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button  variant="outline-danger" onClick={handleClose}>Close</Button>
        <Button variant="outline-success" onClick={addTicket}>Add</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddTask;
