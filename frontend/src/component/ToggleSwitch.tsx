import StyledLabel from "../styling/toggle"




//Creating the interface for the Workoder
interface IWorkOrderState{
    work_order : {
        id : number,
        name : string,
        status : string
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

const styles = {
    togglebutton: {
        marginBottom: 16
    }
};

const ToggleSwitch: React.FC<ToggleProps> = (props) => {
    const styles = {
        togglebutton: {
            marginBottom: 16
        }
    };


    //handling on toggle switch
    // checking if condition is OPEN
    // or CLOSED
    // and updating the database accordingly
    const handleEditClick = async (workOrderBeingEdited: IWorkOrderState) => {
        if (props.isOpen){
            if (workOrderBeingEdited && workOrderBeingEdited.work_order){
                workOrderBeingEdited.work_order.status = "CLOSED"

                let value =  workOrderBeingEdited.work_order
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