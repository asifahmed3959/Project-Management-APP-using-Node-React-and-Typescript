import React, { useState } from 'react';
import {User} from "../models/User";
import WorkOrderAssignee from "./WorkOrderAssignee";

interface IState {
}

const Form: React.FC<any> = (props) => {
    const [formName, setFormName] = useState("workorder name");
    const [workoderCreated, setWorkOrderCreate] = useState(false)

    // const formik = useFormik({
    //     initialValues: { name: '' },
    //     onSubmit: (values: FormValues) => {
    //         fetch('https://your-server-url.com/submit', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(values),
    //         })
    //             .then((response) => {
    //                 if (!response.ok) {
    //                     throw new Error(response.statusText);
    //                 }
    //                 console.log('Form submitted successfully!');
    //             })
    //             .catch((error) => {
    //                 console.error(error);
    //             });
    //     },
    //     //...
    // });

    const handleSubmit = async () => {
        alert(`The name you entered was: ${formName}`)
        if (formName !== "workorder name"){
            setWorkOrderCreate(true);
            // const url = "/api/users"
            // const fetchData = async () => {
            //     try {
            //         const response = await fetch(url);
            //         const user_json_data = await response.json();
            //     } catch (error) {
            //         console.log("error", error);
            //     }
            // await fetchData();

        }
    }


    return (
        <div>
            { !workoderCreated && (
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input
                    type="text"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                />
            </label>
            <input type="submit" value="Submit"/>
        </form>
            )}
            {
                !!workoderCreated && (
                    <div>
                        <p>The name of the created workorder is: {formName}</p>
                        <p>Please select Assignees</p>
                    </div>
                )
            }
    </div>

    );
};

export default Form;