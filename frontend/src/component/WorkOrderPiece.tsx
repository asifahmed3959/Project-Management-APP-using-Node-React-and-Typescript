import React from 'react';
import { WorkOrder } from '../models/WorkOrder';
import {Link} from 'react-router-dom';
import { useNavigate } from "react-router-dom";

interface WorkOrderProps {
    workorder: WorkOrder;
}

const WorkOrderPiece : React.FC<WorkOrderProps> = ({ workorder}: WorkOrderProps) => {
    const navigate = useNavigate();

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

