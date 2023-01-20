import React from 'react';
import './App.css';
import WorkOrders from "./component/WorkOrdersList";
import WorkOrderDetail from "./component/WorkOrderDetail";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Input from "./component/Input"
import Productivity from "./component/Productivity";
import Home from "./component/Home";


// the react-router-dom package has been updated and this enlists are the paths
function App() {
  return (
      <Router>
          <Routes>
              <Route path="/" index element={<Home />} />
              <Route path="/workorders" index element={<WorkOrders />} />
              <Route path="workorders/:id" element={<WorkOrderDetail />} />
              <Route path="/workorders/create" element={<Input />} />
              <Route path="/users/productivity" element={<Productivity />} />

          </Routes>
      </Router>
  );
}

export default App;
