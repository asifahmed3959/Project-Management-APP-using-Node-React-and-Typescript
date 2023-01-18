import React, { useState, ChangeEvent } from "react";
import styled from "styled-components";
import COLORS from "../styling/color";
import {User} from "../models/User";

// Creating ToggleSwitch.tsx module


const StyledLabel = styled.label<{ checked: boolean }>`  
cursor: pointer;  
text-indent: -9999px;  
width: 125px;  
height: 74px;  
background: ${({ checked }) => (checked ? COLORS.GREEN :  COLORS.GRAY)};  
display: block;  
border-radius: 75px;  
position: relative;&:after {    
content: "";    
position: absolute;    
left: ${({ checked }) => (checked ? "14px" : "calc(55% - 5px)")};    top: 12px;    
width: 50px;    
height: 50px;    
background: #fff;    
border-radius: 90px;    
transition: 0.3s;  
}`;

//Creating the interface for the Workoder
interface IWorkOrderState{
    work_order : {
        id : number,
        name : string,
        status : string
        assignees : User []
    } | null
}

//This interface defines the state types which is sent as properties from the
// previous component
interface ToggleProps{
    isOpen: boolean | null, // checks if the status of the work order is open or closed

    setIsOpen :  React.Dispatch<React.SetStateAction<boolean | null>>,
    workorder : IWorkOrderState,
    setWorkOrder :  React.Dispatch<React.SetStateAction<IWorkOrderState>>

    id : string | undefined
}

const ToggleSwitch: React.FC<ToggleProps> = (props) => {


    //handling on toggle switch
    // checking if condition is OPEN
    // or CLOSED
    // and updating the database accordingly
    const handleEditClick = async (workOrderBeingEdited: IWorkOrderState) => {
        if (props.isOpen){
            if (workOrderBeingEdited && workOrderBeingEdited.work_order){
                workOrderBeingEdited.work_order.status = "CLOSED"
                let value =  workOrderBeingEdited.work_order
                console.log(value);
                const response = await fetch('/api/workorders/' + props.id, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(value),
                })

                if (response.status === 200){
                    props.setIsOpen(false);
                    props.setWorkOrder(workOrderBeingEdited);
                }
            }
        }
        else if(props.isOpen != null && !props.isOpen){
            if (workOrderBeingEdited && workOrderBeingEdited.work_order){
                workOrderBeingEdited.work_order.status = "OPEN"
                let value =  workOrderBeingEdited.work_order
                console.log(value);
                const response = await fetch('/api/workorders/' + props.id, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(value),
                })

                if (response.status === 200){
                    props.setIsOpen(true);
                    props.setWorkOrder(workOrderBeingEdited);
                }
            }
        }
    };

    return (
        <div>
            {props.isOpen !==null && (<StyledLabel htmlFor="checkbox" checked={props.isOpen}>
                <input
                    id="checkbox"
                    type="checkbox"
                    checked={props.isOpen}
                    onChange={() => {
                        handleEditClick(props.workorder);
                    }} />
            </StyledLabel>)}
        </div>
);


}

export default ToggleSwitch;