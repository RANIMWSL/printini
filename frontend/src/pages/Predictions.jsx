import { Table, Button, Form, Card, Modal, Stack } from "react-bootstrap";
import "./Financial.css";


import search from "./image/search.png";
import { AiFillFilter } from "react-icons/ai";

export default function Predictions() {
  

  return (
    <div className="Financial">
   
        <div className="p-2">
          <h1 style={{ color: "#667eea" }}>Predictions</h1>
        </div>
        
      <Stack direction="horizontal" gap={3} className="my-3">
        <Form.Control className="me-auto" placeholder="Search..." />
        <AiFillFilter />
        <img src={search} className="search" alt="Search" />
      </Stack>

      <Card className="shadow-sm p-4">
        <Card.Body>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Ref</th>
                <th>Material</th>
                <th>Color</th>
                <th>Quantity</th>
                <th>Recommended Quantity</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              
            </tbody>
          </Table>
        </Card.Body>
      </Card>

    
    </div>
  );
}
