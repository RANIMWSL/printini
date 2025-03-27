import React from "react"
import Login from "./Login"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Dashboard from "./pages/Dashboard";
import Sidebar from "./Sidebar";
import Financial from "./pages/Financial";

import Inventory from "./pages/Inventory";
import Predictions from "./pages/Predictions";
import Plate_optimization from "./pages/Plate_optimization";
import Settings from "./pages/Settings";
import Visualization from "./pages/Visualization.JSX";
import KanbanBoard from "./pages/KanbanBoard";
 
const ComponentWrapper =({children})=>{
  return (
    <div className="main-container">
            <Sidebar />
            <div className="content">
              {children}
            </div>
          </div>
  )

}

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/login" element={ <Login />} />
        <Route path="/dashboard" element={<ComponentWrapper><Dashboard /></ComponentWrapper>} />
        <Route path="/financial" element={<ComponentWrapper><Financial /></ComponentWrapper>} />
        <Route path="/ KanbanBoard " element={<ComponentWrapper><KanbanBoard /></ComponentWrapper>} />
        <Route path="/3d-visualization" element={<ComponentWrapper><Visualization /></ComponentWrapper>} />
        <Route path="inventory" element={<ComponentWrapper><Inventory /></ComponentWrapper>} />
        <Route path="/predictions" element={<ComponentWrapper><Predictions /></ComponentWrapper>} />
        <Route path="/plate-optimization" element={<ComponentWrapper><Plate_optimization /></ComponentWrapper>} />
        <Route path="/kanbanBoard" element={<ComponentWrapper><KanbanBoard/></ComponentWrapper>} />
        <Route path="/settings" element={<ComponentWrapper><Settings /></ComponentWrapper>} />
        
      </Routes>
    </Router>
  );
}

export default App;