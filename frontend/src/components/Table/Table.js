import React, { useState } from 'react'
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Table.css'
import Moment from 'moment';


function Table() {

    const [getuserdata, setUserdata] = useState([]);
    // const { dltdata, setDLTdata } = useContext(deldata);

    // console.log(getuserdata);

    const data = Moment(new Date()).format("YYYY-MM-DD");


    const getData = async (e) => {


        const res = await fetch("http://localhost:5000/getdata", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();
        // console.log(data);

        if (res.status === 422 || !data) {
            console.log("error ");

        } else {
            // history.push("/")
            // setUdata(data)
            setUserdata(data)
            // console.log("get data");

        }
    }

    useEffect(() => {
        getData();
    }, [])

    const deleteuser = async (id) => {

        const res2 = await fetch(`http://localhost:5000/deleteuser/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const deletedata = await res2.json();
        console.log(deletedata);

        if (res2.status === 422 || !deletedata) {
            console.log("error");
        } else {
            console.log("user deleted");
            window.location.reload(false);
            getData();
        }

    }

    return (
        <div>
            <div class="container table-home">
                <div class="row">
                    <div class="table-responsive">

                        <table class="table">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Picture</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Phone</th>
                                    <th scope="col">DOB</th>
                                    <th scope="col">Job Type</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {getuserdata.map((udata, idx) => {
                                    return (
                                        <tr key={idx}>
                                            <th scope="row">{udata.name}</th>
                                            <td> <img src={`/uploads/${udata.picture} `} alt="Admin" width="50" height="50"></img></td>
                                            <td>{udata.email}</td>
                                            <td>{udata.mobile}</td>
                                            <td>{udata.dob}</td>
                                            <td>{udata.jobtype}</td>
                                            <td className="d-flex justify-content-between">
                                                <NavLink to={`/view/${udata._id}`} className="action-button"><button className="btn btn-success button">Pic</button></NavLink>
                                                <NavLink to={`/edit/${udata._id}`} className="action-button"><button className="btn btn-primary button">Edit</button></NavLink>
                                                <button className="btn btn-danger button" onClick={() => deleteuser(udata._id)}>Delete</button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>



        </div>
    )
}

export default Table