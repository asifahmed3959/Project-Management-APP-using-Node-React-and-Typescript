import React, {ChangeEvent, Component, useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {MOCK_WORKORDER} from "../models/MockWorkOrder";
import {WorkOrder} from "../models/WorkOrder";
import { User } from "../models/User";
import WorkOrderAssignee from "./WorkOrderAssignee";
import ToggleSwitch from "./ToggleSwitch";
import UserComponent from "./UserComponent";



interface IWorkOrderState{
    work_order : {
        id : number,
        name : string,
        status : string
    } | null
}

interface IassigneeState{
    assignees : User []
}



// another functional component which does props as any
// Workoder and setWorkOrder is a state
// used for closed or open workorder
// id is the param received from the url workoders/1
// which will be retrieved from database
const WorkOrderDetail: React.FC<any> = (props) =>{
    const [workorder, setWorkOrder] = useState<IWorkOrderState>( {work_order : null});
    const [assignee, setAssignee] = useState<IassigneeState>( {assignees : []});
    const [isOpen, setIsOpen] = useState<boolean | null>(null)
    const {id} = useParams();
    var link = <Link to="/workorders"><strong>Click Here</strong></Link>

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
            const url2 = url + "/assignees"
            const urls = [url, url2];

            const getData = async () => {
                const [work_order, assignee] = await Promise.all(
                    urls.map((url) => fetch(url).then((res) => res.json()))
                );
                setWorkOrder(work_order);
                const status = work_order.work_order.status === "OPEN";
                setIsOpen(status);
                setAssignee(assignee);
            };
            getData();
        }

    }, [])


    //Here I have a toggle switch component
    // I have passed the state into the toggle switch component as properties
    // Where once toggled I have set the value and changed the state.
    return (
        <div className="App">
            <header className="App-header">WorkOrderSection</header>
            <h3 className="small-header">This is the work order in details with the information of the assignees, to close the work order use the toggle button.{'\n'} To visit the list of work orders {link}</h3>
            <div className="card">
                <section className="container">
            {
                workorder.work_order? (
                    <>
                        <p>The id of the workorder is: {workorder.work_order.id}</p>
                        <p>The name of the workorder is: {workorder.work_order.name}</p>
                        <p>The status of the workorder is: {workorder.work_order.status}</p>
                        <ToggleSwitch isOpen={isOpen} setIsOpen={setIsOpen} workorder={workorder} setWorkOrder={setWorkOrder} id={id} />
                    </>
                ) : (
                    <p>
                        Sorry This WorkOrder does not exist
                    </p>
                )
            }
            {
                assignee.assignees? (
                    <>
                        <p>The Number of assignees are: {assignee.assignees.length}</p>
                    {assignee.assignees.map(user => (
                            <UserComponent key={user.id} user={user} />
                        ))}
                    </>
                ) : (
                    <p>
                        Sorry This WorkOrder does not exist
                    </p>
                )
            }
            </section>
            </div>
        </div>
    )
}


export default WorkOrderDetail



  
