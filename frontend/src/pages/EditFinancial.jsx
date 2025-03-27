import { Modal, Button, Form } from 'react-bootstrap';

export default function EditFinancial({ show, handleClose, handleEdit, currentItem }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const updatedItem = {
      id: currentItem.id,
      type: formData.get("type"),
      category: formData.get("category"),
      amount: formData.get("amount"),
      date: formData.get("date"),
      notes: formData.get("notes"),
    };

    handleEdit(updatedItem);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Type</Form.Label>
            <Form.Control name="type" defaultValue={currentItem?.type} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Control name="category" defaultValue={currentItem?.category} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Amount</Form.Label>
            <Form.Control type="number" name="amount" defaultValue={currentItem?.amount} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Date</Form.Label>
            <Form.Control name="date" defaultValue={currentItem?.date} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Notes</Form.Label>
            <Form.Control as="textarea" name="notes" defaultValue={currentItem?.notes} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
