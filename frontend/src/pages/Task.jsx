import React from "react";
import { Draggable } from "@hello-pangea/dnd";
import { Button } from "react-bootstrap";
import { MdDelete } from "react-icons/md";

const Task = ({ task, index, columnId, deleteTask }) => {
  return (
    <Draggable draggableId={task.title} index={index}>
      {(provided) => (
        <div
          className="task"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          {task.imageUrl && <img src={task.imageUrl} alt="Preview" className="img-preview" style={{ width: "80px", height: "80px", objectFit: "cover" }} />}
          
          <MdDelete   onClick={() => deleteTask(task.title, columnId)}    />
        </div>
      )}
    </Draggable>
  );
};

export default Task;
