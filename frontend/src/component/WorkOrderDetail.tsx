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

// another functional component which does props as any
// Workoder and setWorkOrder is a state
// used for closed or open workorder
// id is the param received from the url workoders/1
// which will be retrieved from database
const WorkOrderDetail: React.FC<any> = (props) =>{
    const [workorder, setWorkOrder] = useState<IWorkOrderState>( {work_order : null});
    const [isOpen, setIsOpen] = useState<boolean | null>(null)
    const {id} = useParams();

    // using hooks which helps to use functional component as functions rather than implementing classes
    // takes in the ID
    // calls the database
    // fetches the value
    // and set the workoder state
    // IsOpen is another state
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


    //Here I have a toggle switch component
    // I have passed the state into the toggle switch component as properties
    // Where once toggled I have set the value and changed the state.
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



  
