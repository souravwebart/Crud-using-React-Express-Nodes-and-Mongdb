import React, { useState } from 'react';
import $ from 'jquery';
import '../Form/Form.css';
import { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';


function Edit() {

    // const [getuserdata, setUserdata] = useState([]);

    const [inpval, setinpval] = useState({
        name: "",
        mobile: "",
        email: "",
        dob: "",
        picture: "",
        jobtype: "",
        location: "",
    })
    $(document).ready(function () {
        $("#wizard-picture").change(function () {
            readURL(this);
        });
    });
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#wizardPicturePreview').attr('src', e.target.result).fadeIn('slow');
            }
            reader.readAsDataURL(input.files[0]);
        }

    }
    const setdata = (e) => {
        console.log(e.target.value)
        const { name, value } = e.target;

        setinpval((preval) => {
            return {
                ...preval,
                [name]: value
            }
        })
    }

    const uploadfile = (e) => {

        // console.log(e.target.files[0])

        setinpval((preval) => {
            return {
                ...preval,
                picture: e.target.files[0]
            }
        })

    }
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
        console.log(data);

        if (res.status === 422 || !data) {
            console.log("error ");

        } else {
            // history.push("/")
            // setUdata(data)
            setinpval(data)
            // console.log("get data");

        }
    }

    useEffect(() => {
        getData();
    }, [])

    const history = useHistory("");

    const updateuser = async (e) => {
        e.preventDefault();

        const { name, mobile, email, picture, dob, jobtype, location } = inpval;

        const res2 = await fetch(`http://localhost:5000/updateuser/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, mobile, email, picture, dob, jobtype, location
            })
        });
        console.log("inpval", inpval)

        const data2 = await res2.json();
        console.log("data2", data2);

        if (res2.status === 422 || !data2) {
            alert("fill the data");
        } else {
            history.push("/")
            setinpval(data2);
        }
        // let url = `http://localhost:5000/updateuser/${id}`
        // const formdata = new FormData();
        // formdata.append('picture', inpval.picture, inpval.picture.name);
        // formdata.append('name', inpval.name)
        // formdata.append('mobile', inpval.mobile)
        // formdata.append('email', inpval.email)
        // formdata.append('dob', inpval.dob)
        // formdata.append('jobtype', inpval.jobtype)
        // formdata.append('location', inpval.location)

        // const res2 = axios.post(url, formdata);
        // const data2 = res2.json();
        // // console.log("data", data);

        // if (res2.status === 422 || !data2) {
        //     console.log("error ");
        //     alert("error");

        // } else {
        //     history.push("/")
        //     setinpval(data2);

        // }
    }

    return (
        <>
            <div className="container home">
                <div className="row">
                    <div className="col-12">
                        <div className="my-5">
                            <h3>Register</h3>
                            <hr></hr>
                        </div>
                        <form className="file-upload">
                            <div className="row mb-5 gx-5">
                                <div className="col-xxl-8 mb-5 mb-xxl-0">
                                    <div className="bg-secondary-soft px-4 py-5 rounded">
                                        <div className="row g-3">
                                            <div className="col-md-12 flextab">
                                                <label className="form-label">Full Name *</label>
                                                <input type="text" name="name" value={inpval.name} onChange={setdata} className="form-control" placeholder="" aria-label="First name"></input>
                                            </div>
                                            <div className="col-md-12 flextab">
                                                <label className="form-label">Mobile number *</label>
                                                <input type="text" name="mobile" value={inpval.mobile} onChange={setdata} className="form-control" placeholder="" aria-label="Phone number"></input>
                                            </div>
                                            <div className="col-md-12 flex">
                                                <label for="birthday">Job Type*</label>
                                                <div className="form-check form-check-inline" value={inpval.jobtype} onChange={setdata} >
                                                    <input name="jobtype" value="Full time" className="form-check-input" type="checkbox" id="inlineCheckbox1"></input>
                                                    <label className="form-check-label" for="inlineCheckbox1">FT</label>
                                                </div>
                                                <div className="form-check form-check-inline" value={inpval.jobtype} onChange={setdata} >
                                                    <input name="jobtype" value="Part time" className="form-check-input" type="checkbox" id="inlineCheckbox2" ></input>
                                                    <label className="form-check-label" for="inlineCheckbox2">PT</label>
                                                </div>
                                                <div className="form-check form-check-inline" value={inpval.jobtype} onChange={setdata}>
                                                    <input name="jobtype" value="Consultant" className="form-check-input" type="checkbox" id="inlineCheckbox3" ></input>
                                                    <label className="form-check-label" for="inlineCheckbox3">Consultant</label>
                                                </div>
                                            </div>
                                            <div className="col-md-12 flex">
                                                <div className="col-auto my-1">
                                                    <div className="custom-control custom-checkbox mr-sm-2 flex1">
                                                        <label className="mr-sm-2 sr-only" for="inlineFormCustomSelect">Pref. location </label>
                                                        <input name="check box" type="checkbox" className="custom-control-input" id="customControlAutosizing"></input>
                                                        <label className="custom-control-label" for="customControlAutosizing"></label>
                                                    </div>

                                                </div>
                                                <div className="col-auto my-1">
                                                    <select value={inpval.location} name="location" onChange={setdata} class="form-select form-select-sm mb-3" aria-label=".form-select-sm example">
                                                        <option name="Chennai"  >Chennai</option>
                                                        <option name="Delhi" >Delhi</option>
                                                        <option name="Mumbai">Mumbai</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xxl-4">
                                    <div className="bg-secondary-soft px-4 py-5 rounded">
                                        <div className="row g-3">
                                            <div className="text-center">
                                                <div className="picture-container">
                                                    <div className="picture-upload">
                                                        <h6 className="">Picture</h6>
                                                    </div>
                                                    <div className="picture">
                                                        <img src={`/uploads/${inpval.picture} `} alt="Admin" className="rounded-circle" width="150"></img>
                                                        <input name="picture" inpval="picture" onChange={uploadfile} type="file" id="wizard-picture" className=""></input>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-12 flextab">
                                                <label for="inputEmail4" className="form-label">Email Id*</label>
                                                <input name="email" value={inpval.email} onChange={setdata} type="email" className="form-control" id="inputEmail4"></input>
                                            </div>
                                            <div className="col-md-12 flextab">
                                                <label for="birthday">DOB *</label>
                                                <input type="date" className="form-control" id="birthday" name="dob" value={inpval.dob} onChange={setdata}></input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="gap-3 d-md-flex justify-content-md-end text-center">
                                <button type="button" onClick={updateuser} className="btn btn-primary btn-lg">Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Edit