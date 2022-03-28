import React, { useState } from 'react'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Details.css'
import { NavLink } from 'react-router-dom';



function Details() {

    const [getuserdata, setUserdata] = useState([]);


    const { id } = useParams("")
    console.log(id)

    // console.log("getuserdata", getuserdata);

    const getData = async (e) => {


        const res = await fetch(`http://localhost:5000/getuser/${id}`, {
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

    return (
        <>
            <div className="container">
                <div style={{ minHeight: "93vh" }} className="main-body">
                    {/* 
                    <nav aria-label="breadcrumb" className="main-breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                            <li className="breadcrumb-item"><a href="javascript:void(0)">User</a></li>
                            <li className="breadcrumb-item active" aria-current="page">User Profile</li>
                        </ol>
                    </nav> */}
                    <h1 className="headh1">Welcome to <span className="spanh1">{getuserdata.name}</span></h1>
                    <div className="row gutters-sm">
                        <div className="col-md-4 mb-3">
                            <div className="card">
                                <div className="card-body">
                                    <div className="d-flex flex-column align-items-center text-center">
                                        <img src={`/uploads/${getuserdata.picture} `} alt="Admin" className="rounded-circle" width="150"></img>
                                        <div className="mt-3">
                                            <h4>{getuserdata.name}</h4>
                                            <p className="text-secondary mb-1">{getuserdata.jobtype}</p>
                                            <p className="text-muted font-size-sm">{getuserdata.location}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="col-md-8">
                            {<div className="card mb-3">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Full Name</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            {getuserdata.name}
                                        </div>
                                    </div>
                                    <hr></hr>
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Email</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            {getuserdata.email}
                                        </div>
                                    </div>
                                    <hr></hr>
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Mobile</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            {getuserdata.mobile}
                                        </div>
                                    </div>
                                    <hr></hr>
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Date of Birth</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            {getuserdata.dob}
                                        </div>
                                    </div>
                                    <hr></hr>
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Job Type</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            {getuserdata.jobtype}
                                        </div>
                                    </div>
                                    <hr></hr>
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Location</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            {getuserdata.location}
                                        </div>
                                    </div>
                                    <hr></hr>
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <NavLink to={`/edit/${getuserdata._id}`}><a className="btn btn-info " target="__blank">Edit</a></NavLink>
                                        </div>
                                    </div>
                                </div>
                            </div>}
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Details