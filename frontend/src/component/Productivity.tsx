import React, {Component} from "react";
import {User} from "../models/User";
import WorkOrderPiece from "./WorkOrderPiece";
import UserComponent from "./UserComponent";
import {Link} from "react-router-dom";


//initializing an interface
// which will define the type of data I am working with
// in the state. Here I have a usermodel array union with null
//which will be assigned to users who not are assigned to any work order
interface IUserState{
    user_list : User[] | null
}


//creating a Class component, which receives props as any and
// the state as IUserState interface which I have defined before
// This class renders a list of users
// by using GET request from the database /api/productivity
class Productivity extends Component<any, IUserState> {
    public state: IUserState = {
        user_list: null,
    };

    render() {
        // initializing the workoder_list from the state
        const { user_list } = this.state;

        var link = <Link to="/"><strong>Click Here</strong></Link>

        // checking if the workoder_list is null, if null, fetch the data from database
        if (!user_list){
            this.getUser();
        }
        //mapping the workorder list to a card view component
        return (
            <div>
                {!!user_list && (
                    <>
                        <div className="App">
                            <header className="App-header">Productivity List</header>
                            <h3 className="small-header">These are the list of users who are not assigned in a work order. To go back to home {link}</h3>
                            <ul className="row">
                                    <div className="card">
                                        <section className="container">
                                {user_list.map((user) => (
                                    <UserComponent user={user} key={user.id} />
                                ))}
                                        </section>
                                    </div>
                            </ul>
                        </div>
                    </>
                )}
            </div>
        );
    }

    // asynchronous function which fetches data from the database
    // and changes the state with user list
    private getUser = async () => {
        const response = await fetch("/api/productivity", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            }
        });
        const jsonResponse = await response.json();
        this.setState({ user_list: jsonResponse.user_list});
    };
}

export default Productivity;
