import React, {useEffect, useState} from 'react';
import {User} from "../models/User";
import WorkOrderAssignee from "./WorkOrderAssignee";
import CreateWorkOrderAssignee from "./CreateWorkOrderAssignee";

interface IState {
}

interface Props{

}

const Input: React.FC<any> = (props) => {
    const [formName, setFormName] = useState("");
    const [workoderCreated, setWorkOrderCreate] = useState(false);
    const [assignees, setassignees] = useState<User[]>([]);
    const [assigned, setassigned] = useState<number[]>([]);

    useEffect(() => {
            const url = "/api/users"
            const fetchData = async () => {
                try {
                    const response = await fetch(url);
                    const users_json = await response.json();
                    setassignees(users_json.users);
                } catch (error) {
                    console.log("error", error);
                }
            };
            fetchData();


    }, [])

    const handleSubmit = (workodername:string) => {

        if (workodername.length < 3) {
            alert(`The name you entered was less than 3 letters, please enter a work order name with more than 3 letters`);
            setFormName("");
        } else {
            alert(`The name you entered was: ${formName}`);
        }


        if (formName !== "") {
            setWorkOrderCreate(true);

            const url = "/api/users"
            const fetchData = async () => {
                try {
                    const response = await fetch(url);
                    const user_json_data = await response.json();
                } catch (error) {
                    console.log("error", error);
                }
                fetchData();
            }
        }
    }

    async function handleCreateWorkOrder() {

    }

    return (
        <div>
            <div className="App">
                <header className="App-header">Create Work Order</header>
            </div>
            { !workoderCreated? (
        <form >
            <label>
                Name:
                <input
                    type="text"
                    value={formName}
                    placeholder="enter the work order name"
                    onChange={(e) => setFormName(e.target.value)}
                />
            </label>
            <input type="submit" value="Submit" onClick={() => handleSubmit(formName)}/>
        </form>

            ) : (
                    <div>
                        <p>The name of the created workorder is: {formName}</p>
                        <p>Please select Assignees</p>
                        <p>The Number of assignees are: {assignees.length}</p>
                        {assignees.map(user => (
                            <CreateWorkOrderAssignee
                                key={user.id}
                                user={user}
                                assignees={assignees}
                                setassignees={setassignees}
                                assigned = {assigned}
                                setassigned = {setassigned}
                            />
                        ))}
                        <button onClick={() => handleCreateWorkOrder()}>
                            Create Work Order
                        </button>
                    </div>
                )
            }

    </div>
    );
};

export default Input;