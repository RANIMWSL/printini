import "./Sidebar.css";
import { Link } from "react-router-dom";
import { FaTachometerAlt, FaMoneyBillWave, FaTasks, FaCube, FaBoxes, FaChartLine, FaCogs } from 'react-icons/fa';
import { FaHome } from "react-icons/fa";


export default function Sidebar() {
  return (
    <div className="sidebar">
      <ul>
        <li><Link to="/dashboard"><FaTachometerAlt /> Dashboard</Link></li>
        <li><Link to="/financial"><FaMoneyBillWave /> Financial monitoring</Link></li>
        <li><Link to="/KanbanBoard "><FaTasks /> Kanban</Link></li>
        <li><Link to="/3d-visualization"><FaCube /> 3D visualization</Link></li>
        <li><Link to="/inventory"><FaBoxes /> Inventory</Link></li>
        <li><Link to="/predictions"><FaChartLine /> Predictions</Link></li>
        <li><Link to="/plate-optimization"><FaChartLine /> Plate optimization</Link></li>
        <li><Link to="/settings"><FaCogs /> Settings</Link></li>
      </ul>
    </div>
  );
}
