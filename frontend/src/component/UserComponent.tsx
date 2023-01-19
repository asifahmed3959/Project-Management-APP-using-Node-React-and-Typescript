import { FaUserTie } from "react-icons/fa";
import React, {useState} from 'react';
import { User } from '../models/User';


//interface
interface UserProps {
    user: User;
}

//creating a functional component which accepts user props from previous component
// a single user
// also it uses tool tip
const UserComponent : React.FC<UserProps> = ({ user}: UserProps) => {
    const [isShown, setIsShown] = useState(false);
    const tooltipStyle = {
        display: isShown ? 'block' : 'none'
    }

    return (
                    <h5 className="strong" >
                        <FaUserTie size={20} style={{ alignItems: 'flex-start' }}/>
                        <span style={{ marginLeft: '.5rem' }}
                              onMouseEnter={() => setIsShown(true)}
                              onMouseLeave={() => setIsShown(false)}
                        >
                            {user.name}
                        </span>
                        <div style={tooltipStyle}>{user.email}</div>
                    </h5>
    )
}

export default UserComponent;