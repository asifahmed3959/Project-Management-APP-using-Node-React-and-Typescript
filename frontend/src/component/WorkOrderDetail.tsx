import React, {ChangeEvent, Component, useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import {MOCK_WORKORDER} from "../models/MockWorkOrder";
import {WorkOrder} from "../models/WorkOrder";
import { User } from "../models/User";
import WorkOrderAssignee from "./WorkOrderAssignee";
import ToggleSwitch from "./ToggleSwitch";



interface IWorkOrderState{
    work_order : {
        id : number,
        name : string,
        status : string
        assignees : User []
    } | null
}

//
// {
//     "work_order": {
//     "name": "Walk Dog Morty around the block",
//         "status": "OPEN",
//         "id": 3,
//         "assignees": [
//         {
//             "user_id": 1,
//             "user_email": "alien@mortys.com",
//             "user_name": "Alien Morty"
//         },
//         {
//             "user_id": 4,
//             "user_email": "dawg@mortys.com",
//             "user_name": "Dog Morty"
//         }
//     ]
// }
// }

const WorkOrderDetail: React.FC<any> = (props) =>{
    const [workorder, setWorkOrder] = useState<IWorkOrderState>( {work_order : null});
    const [isOpen, setIsOpen] = useState<boolean | null>(null)
    const {id} = useParams();

    // const handleEditClick = async (workOrderBeingEdited: IWorkOrderState) => {
    //     if (isOpen){
    //         if (workOrderBeingEdited && workOrderBeingEdited.work_order){
    //             workOrderBeingEdited.work_order.status = "CLOSED"
    //             let value =  workOrderBeingEdited.work_order
    //             console.log(value);
    //              const response = await fetch('/api/workorders/' + id, {
    //                         method: 'PUT',
    //                         headers: {
    //                             'Content-Type': 'application/json',
    //                         },
    //                         body: JSON.stringify(value),
    //                     })
    //
    //             if (response.status === 200){
    //                 setIsOpen(false);
    //                 setWorkOrder(workOrderBeingEdited);
    //             }
    //         }
    //     }
    //     else if(isOpen != null && !isOpen){
    //         if (workOrderBeingEdited && workOrderBeingEdited.work_order){
    //             workOrderBeingEdited.work_order.status = "OPEN"
    //             let value =  workOrderBeingEdited.work_order
    //             console.log(value);
    //             const response = await fetch('/api/workorders/' + id, {
    //                 method: 'PUT',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                 },
    //                 body: JSON.stringify(value),
    //             })
    //
    //             if (response.status === 200){
    //                 setIsOpen(true);
    //                 setWorkOrder(workOrderBeingEdited);
    //             }
    //         }
    //     }
    //   };

    useEffect(() => {
        if (id)
        {
            const url = "/api/workorders/" + id
            const fetchData = async () => {
            try {
                const response = await fetch(url);
                const work_order = await response.json();
                const status = work_order.work_order.status === "OPEN"
                setIsOpen(status)
                setWorkOrder(work_order);

            } catch (error) {
                console.log("error", error);
            }
        };
            fetchData();
        }

    }, [])

    function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
        console.log("---", e.target.checked);
        setIsOpen(!workorder);
    }


    return (
        <div className="App">
            <header className="App-header">WorkOrderSection</header>
            {
                workorder.work_order? (
                    <>
                        <p>The id of the workorder is: {workorder.work_order.id}</p>
                        <p>The name of the workorder is: {workorder.work_order.name}</p>
                        <p>The status of the workorder is: {workorder.work_order.status}</p>
                        <ToggleSwitch isOpen={isOpen} setIsOpen={setIsOpen} workorder={workorder} setWorkOrder={setWorkOrder} id={id} />
                        {/*<button*/}
                        {/*    className="bordered"*/}
                        {/*          onClick={() => {*/}
                        {/*             handleEditClick(workorder);*/}
                        {/*          }}*/}
                        {/*>*/}
                        {/*    <span className="icon-edit "></span>*/}
                        {/*    {workorder.work_order.status}*/}
                        {/*</button>*/}
                        <p>The Number of assignees are: {workorder.work_order.assignees.length}</p>
                        {workorder.work_order.assignees.map(user => (
                                <WorkOrderAssignee key={user.id} user={user} />
                            ))}
                    </>
                ) : (
                    <p>
                        Sorry This WorkOrder does not exist
                    </p>
                )
            }
        </div>
    )
}


export default WorkOrderDetail



  
