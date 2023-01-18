import { User } from '../models/User'
import React, {useState} from "react";


interface IProps{
    user : User,
    assignees : User[],
    setassignees :  React.Dispatch<React.SetStateAction<User[]>>,
    assigned : number[],
    setassigned: React.Dispatch<React.SetStateAction<number[]>>
}


const CreateWorkOrderAssignee:React.FC<IProps> = ({user,assignees, setassignees, assigned, setassigned}) =>{
    const [selected, setSelected] = useState(false);

    function handleInputChange(user: User) {
        if (user !== undefined && user.id !== undefined){
        setSelected(!selected);
        setassignees(assignees.filter(userItem => userItem !== user));
        setassigned([...assigned , user.id]);
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
                        checked={selected}
                    />
                    {user.name}
                </div>
            </label>
        </>
    );
}

export default CreateWorkOrderAssignee