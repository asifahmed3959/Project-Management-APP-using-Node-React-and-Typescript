import { User } from '../models/User'
import React, {useState} from "react";


interface IProps{
    workorder_id : number | null,
    user : User,
    users : User[],
    setUsers :  React.Dispatch<React.SetStateAction<User[]>>,
    assigned : User[],
    setassigned: React.Dispatch<React.SetStateAction<User[]>>,
}


const CreateWorkOrderAssignee:React.FC<IProps> = ({workorder_id, user,users, setUsers, assigned, setassigned}) =>{
    const [selected, setSelected] = useState(false);

    async function handleInputChange(user: User) {
        if (user !== undefined && user.id !== undefined && workorder_id !== null){
            const url = "/api/workorders/" + workorder_id.toString() + "/assignees";
            const postData = async () => {
                const response = await fetch(url, {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ user_id: user.id }),
                });
                const status = await response.status;
                console.log(status)
                if (status === 201){
                    setUsers(users.filter(userItem => userItem !== user));
                    setassigned([...assigned , user]);
                }
            }
            postData();
        }
    }

    return (
        <>
            <label>
                <div>
                    <input
                        key={user.id}
                        type="radio"
                        value={user.name}
                        name={user.name}
                        onChange={e => handleInputChange(user)}
                    />
                    {user.name}
                </div>
            </label>
        </>
    );
}

export default CreateWorkOrderAssignee