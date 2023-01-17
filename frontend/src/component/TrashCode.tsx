import React, {Component, useState} from 'react';
import { WorkOrder } from '../models/WorkOrder';
import {User} from "../models/User";
import { MOCK_USER } from "../models/MockUser";
import {MOCK_WORKORDER} from "../models/MockWorkOrder";

// interface WorkOrderProps {
//     workorder: WorkOrder;
// }
//

interface IWorkOrderState {
    workorder_section : {
        assignees : User[],
        workoder :  WorkOrder | undefined
    } | null;
}

interface WorkOrderProps{
    id : string | undefined
}

const SomeDetail : React.FC<WorkOrderProps> = ({ id }: WorkOrderProps) => {
    return (
        <p>whatever </p>
    )
}
//
//
//
// class WorkOrderDetail extends Component<WorkOrderProps, IWorkOrderState> {
//     public state: IWorkOrderState = {
//         workorder_section: null,
//     };
//
//     render() {
//         this.getWorkOrderSection(this.props.id);
//         const { workorder_section } = this.state;
//
//         return (
//             <div>
//                 {!!workorder_section && !!workorder_section.workoder && (
//                     <>
//                         <p>The name of this workorder is <strong>{workorder_section.workoder.name}</strong>!</p>
//                         <p>The name of this workorder is <strong>{workorder_section.workoder.status}</strong>!</p>
//                         <p>The name of this workorder is <strong>{workorder_section.workoder.id}</strong>!</p>
//                     </>
//                 )}
//             </div>
//         );
//     }
//
//     private handleHelloWorld = async () => {
//         const response = await fetch("/api/example", {
//             method: "POST",
//             headers: {
//                 Accept: "application/json",
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ id: Math.floor(1 + Math.random() * 9) }),
//         });
//         const jsonResponse = await response.json();
//         this.setState({ workorder_section: jsonResponse.favorite });
//     };
//
//
//     private getWorkOrderSection = async (id:string|undefined) => {
//         if (id)
//         {
//             let num_id = parseInt(id);
//             let workOrder;
//             for (let i = 0; i < MOCK_WORKORDER.length; i++) {
//                 if (num_id === MOCK_WORKORDER[i].id){
//                     workOrder = MOCK_WORKORDER[i]
//                 }
//             }
//
//             if (workOrder){
//                 let workorder_section = {
//                     assignees: MOCK_USER,
//                     workoder: workOrder
//                 }
//                 this.setState({ workorder_section : workorder_section})
//             }
//
//         }
//
//     }
// }
// //
//
// export default WorkOrderDetail;