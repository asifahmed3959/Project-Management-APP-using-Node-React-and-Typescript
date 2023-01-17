import { User } from '../models/User'
import {useState} from "react";


interface Iassignee{
    user : User
}


const WorkOrderAssignee:React.FC<Iassignee> = ({user}) =>{
    const [isShown, setIsShown] = useState(false);

    return (
        <>
            <p>Displaying the assignee: {user.id}</p>
            <p  onMouseEnter={() => setIsShown(true)}
                onMouseLeave={() => setIsShown(false)}>
                The name of the assignee is: {user.name}
            </p>
            {isShown && (
                <div>
                    Email: {user.email}
                </div>
            )}
        </>
    )
}

export default WorkOrderAssignee