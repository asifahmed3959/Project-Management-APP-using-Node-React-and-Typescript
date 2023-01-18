import React from 'react';
import { WorkOrder } from '../models/WorkOrder';
import {Link} from 'react-router-dom';
import { useNavigate } from "react-router-dom";

//interface
interface WorkOrderProps {
    workorder: WorkOrder;
}

//creating a functional component which accepts props from previous component
// a single workorder
const WorkOrderPiece : React.FC<WorkOrderProps> = ({ workorder}: WorkOrderProps) => {
    const navigate = useNavigate(); // this helps to reroute to workoders/1 for updating from the react-router-dom package
    // works by finding all the routes and redirects it

    return (
        <div className="column">
            <div className="card">
        <section className="container">
            <h5 className="strong">
                <Link to={`/workorders/${workorder.id}`} onClick={() => navigate(`/workorders/${workorder.id}`)}>
                    <strong>Work Order name: {workorder.name}</strong>
                </Link>
            </h5>
            <p>WorkOrderStatus: {workorder.status}</p>
        </section>
            </div>
        </div>
    )
}

export default WorkOrderPiece;

