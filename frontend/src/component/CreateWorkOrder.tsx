import React, {useEffect, useRef, useState} from 'react';
import {User} from "../models/User";
import WorkOrderAssignee from "./WorkOrderAssignee";
import CreateWorkOrderAssignee from "./CreateWorkOrderAssignee";
import '../styling/input.css';
import {Link} from "react-router-dom";
import UserComponent from "./UserComponent";

interface IState {
}

interface Props{
    // handleAdd: (e: React.FormEvent) => void;
}


// the idea was as this is a multiple create and one dependent on the other
// I wanted to ensure that if an error occurs I am able to debug it.
// also allows handle roll back incase a database error happened.
// for example say I create a work order, and then try to create multiple
// assignees in one single request, if something goes wrong I will be not sure what went wrong.
// therefore, I create a work order
// once that is created I update a single user as an assignee.
const CreateWorkOrder: React.FC<Props> = (props) => {
    const [formName, setFormName] = useState("");
    const [workoderCreated, setWorkOrderCreate] = useState(false);
    const [users, setUsers] = useState<User[]>([]);
    const [assigned, setassigned] = useState<User[]>([]);
    const inputRef = useRef< HTMLInputElement>(null);
    const [workorder_id, setWorkOrderId] = useState<number | null>(null);


    const handleSubmit = async (workodername:string) => {

        if (workodername.length < 3) {
            setFormName("");
            alert(`The name you entered was less than 3 letters, please enter a work order name with more than 3 letters`);
        } else if (workodername.length > 255) {
            setFormName("");
            alert(`The name you entered was more than 255 letters, please enter a work order name with less than 255 letters`);
        } else {

            const workorder_url = "/api/workorders/create"
            const response = await fetch(workorder_url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: workodername }),
            })

            const jsonResponse = await response.json();
                if (jsonResponse.work_oder_id !== null &&  typeof jsonResponse.work_oder_id === 'number'){
                    await setWorkOrderCreate(true);
                    await setWorkOrderId(jsonResponse.work_oder_id);
                }


            const url = "/api/users"
            const fetchData = async () => {
                try {
                    const response = await fetch(url);
                    const users_json = await response.json();
                    setUsers(users_json.users);
                } catch (error) {
                    console.log("error", error);
                }
            };
            fetchData();

           alert("The workorder has been created");
        }
    }

    return (
        <div>
            <div className="App">
                <header className="App-header">Create Work Order</header>
                <h3 className="small-header">Here you create a workorder, once you give the name of the work order you will give be given the option to select the assignees</h3>
            </div>
            <div className="card">
                <section className="container">
            { !workoderCreated? (
                <form className='input' onSubmit={ (e) => {
                    inputRef.current?.blur();
                    e.preventDefault(); // for some reason this helped me get rid of the cors issue, I am not sure what was going on there. But I am still scratching my head.
                    handleSubmit(formName);
                }}>
                    <input
                        ref={inputRef}
                        type='input'
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        placeholder="Enter a workorder"
                        className="input__box"
                    />
                    <button className="input_submit" type="submit" onClick={ (e) => {
                    }}>create</button>
                </form>

            ) : (
                    <div>
                        <p>The name of the created workorder is: {formName}</p>
                        <p>Please select Assignees</p>
                        <p>The Number of users are: {users.length}</p>
                        <p>These are the users who are not assigned</p>
                        {users.map(user => (
                            <CreateWorkOrderAssignee
                                key={user.id}
                                user={user}
                                users={users}
                                setUsers={setUsers}
                                assigned = {assigned}
                                setassigned = {setassigned}
                                workorder_id={workorder_id}
                            />
                        ))}
                        <p>The Number of assignees are: {assigned.length}</p>
                        {assigned.map(user => (
                            <UserComponent
                                key={user.id}
                                user={user}

                            />
                        ))}
                        <p>Once selected click on done, which will redirect you to the list of workorders</p>
                        <Link to="/workorders">
                            <button>done</button>
                        </Link>
                    </div>
                )
            }
            </section>
    </div>
    </div>
    );
};

export default CreateWorkOrder;