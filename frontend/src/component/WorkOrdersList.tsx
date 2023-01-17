import React, {Component} from "react";
import {WorkOrder} from "../models/WorkOrder";
import WorkOrderPiece from "./WorkOrderPiece";


interface IWorkOrderState{
    workorder_list : WorkOrder[] | null
}

class WorkOrders extends Component<any, IWorkOrderState> {
    public state: IWorkOrderState = {
        workorder_list: null,
    };

    render() {
        const { workorder_list } = this.state;

        if (!workorder_list){
            this.getWorkOrder();
        }

        return (
            <div>
                {!!workorder_list && (
                    <>
                       <div className="App">
                         <header className="App-header">WorkOrdersList</header>
                           <ul className="row">
                               {workorder_list.map((workorder) => (
                                   <WorkOrderPiece workorder={workorder} key={workorder.id} />
                               ))}
                           </ul>
                         </div>
                    </>
                )}
            </div>
        );
    }

    private getWorkOrder = async () => {
        const response = await fetch("/api/workorders", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            }
        });
        const jsonResponse = await response.json();
        console.log(jsonResponse)
        this.setState({ workorder_list: jsonResponse.workorder_list });
    };
}

export default WorkOrders;
