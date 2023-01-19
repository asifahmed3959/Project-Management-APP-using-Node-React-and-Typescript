import React, {Component} from "react";
import {WorkOrder} from "../models/WorkOrder";
import WorkOrderPiece from "./WorkOrderPiece";
import {Link, useNavigate} from "react-router-dom";


//initializing an interface
// which will define the type of data I am working with
// in the state. Here I have a Workder array union with null
//which will be assigned to workorder_list
interface IWorkOrderState{
    workorder_list : WorkOrder[] | null
}


//creating a Class component, which receives props as any and
// the state as IWorkOrderState interface which I have defined before
// This class renders a list of work orders
// by using GET request from the database /api/workorders
class WorkOrders extends Component<any, IWorkOrderState> {
    public state: IWorkOrderState = {
        workorder_list: null,
    };

    render() {
        // initializing the workoder_list from the state
        const { workorder_list } = this.state;
        var link = <Link to="/workorders/create"><strong>Click Here</strong></Link>

        // checking if the workoder_list is null, if null, fetch the data from database
        if (!workorder_list){
            this.getWorkOrder();
        }
        //mapping the workorder list to a card view component
        return (
            <div>
                <div className="App">
                    <header className="App-header">WorkOrdersList</header>
                    <h3 className="small-header">These are the list of workorders, to visit to a certain workorder and see the assignees, click on the name of workorder, to create a workorder {link}</h3>
                {!!workorder_list && (
                    <>
                           <ul className="row">
                               {workorder_list.map((workorder) => (
                                   <WorkOrderPiece workorder={workorder} key={workorder.id} />
                               ))}
                           </ul>
                    </>
                )}
                </div>
            </div>
        );
    }

    // asynchronous function which fetches data from the database
    // and changes the state with workorder list
    private getWorkOrder = async () => {
        const response = await fetch("/api/workorders", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            }
        });
        const jsonResponse = await response.json();
        this.setState({ workorder_list: jsonResponse.workorder_list });
    };
}

export default WorkOrders;
