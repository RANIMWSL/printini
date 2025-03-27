import React, { useState } from "react";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Stack } from "react-bootstrap";
import Task from "./Task";
import AddTask from "./AddTask";
import "./styles.css";

const initialColumns = {
  todo: { name: "To Do", tasks: [] },
  inProgress: { name: "In Progress", tasks: [] },
  done: { name: "Done", tasks: [] }
};

const KanbanBoard = () => {
  const [columns, setColumns] = useState(initialColumns);
  const [showModal, setShowModal] = useState(false);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceTasks = [...sourceColumn.tasks];
    const destTasks = [...destColumn.tasks];
    
    const [movedTask] = sourceTasks.splice(source.index, 1);
    destTasks.splice(destination.index, 0, movedTask);

    setColumns({
      ...columns,
      [source.droppableId]: { ...sourceColumn, tasks: sourceTasks },
      [destination.droppableId]: { ...destColumn, tasks: destTasks }
    });
  };

  const deleteTask = (taskTitle, columnId) => {
    setColumns({
      ...columns,
      [columnId]: {
        ...columns[columnId],
        tasks: columns[columnId].tasks.filter(task => task.title !== taskTitle)
      }
    });
  };

  return (
    <div className="trello">
      <Stack direction="horizontal" gap={3} className="mb-3">
        <h1 style={{ color: "#667eea" }}>Kanban</h1>
        <Button variant="outline-dark" onClick={() => setShowModal(true)} className="ms-auto">
          Add Ticket
        </Button>
      </Stack>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="board">
          {Object.entries(columns).map(([id, column]) => (
            <Droppable key={id} droppableId={id}>
              {(provided) => (
                <div className="column" ref={provided.innerRef} {...provided.droppableProps}>
                  <h2>{column.name}</h2>
                  {column.tasks.map((task, index) => (
                    <Task key={task.title} task={task} index={index} columnId={id} deleteTask={deleteTask} />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
      <AddTask show={showModal} handleClose={() => setShowModal(false)} setColumns={setColumns} columns={columns} />
    </div>
  );
};

export default KanbanBoard;
