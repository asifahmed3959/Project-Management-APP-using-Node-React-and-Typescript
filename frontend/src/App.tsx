import React from 'react';
import './App.css';
import WorkOrders from "./component/WorkOrdersList";
import WorkOrderDetail from "./component/WorkOrderDetail";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from "./component/Login";
import Input from "./component/Input";

function App() {
  return (
      <Router>
          <Routes>
              <Route path="/workorders" index element={<WorkOrders />} />
              <Route path="workorders/:id" element={<WorkOrderDetail />} />
              <Route path="/workorders/create" element={<Input />} />

          </Routes>
      </Router>
  );
}

export default App;
