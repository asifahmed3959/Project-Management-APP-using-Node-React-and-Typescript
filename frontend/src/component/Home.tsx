import React, {Component} from "react";
import {Link} from "react-router-dom";



//creating a Class component, Home
// which has all the links to the project
//
class Home extends Component<any, any> {

    render() {
        var link1 = <Link to="/workorders"><strong>Click Here</strong></Link>
        var link2 = <Link to="/workorders/create"><strong>Click Here</strong></Link>
        var link3 = <Link to="/users/productivity"><strong>Click Here</strong></Link>

        //listing out the links
        return (
            <div>
                        <div className="App">
                            <header className="App-header">Welcome to MaintainX take home project</header>
                            <h3 className="small-header">We will guide you to the following links, to visit the pages press on the links.</h3>
                            <ul className="row">
                                <div className="card">
                                    <section className="container">
                                        <li>To see the list of workorders {link1}</li>
                                        <li>To create a workorder {link2}</li>
                                        <li>To see the list of users who are not assigned {link3}</li>
                                    </section>
                                </div>
                            </ul>
                        </div>

            </div>
        );
    }
}

export default Home;
