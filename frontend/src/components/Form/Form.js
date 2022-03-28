import React, { useState } from 'react';
import $ from 'jquery';
import './Form.css';
import Table from '../Table/Table';
import axios from 'axios';

function Form() {

    // const { udata, setUdata } = useContext(adddata);

    // const [fileName, setFileName] = useState({
    //     picture: "",
    // })

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
        // Prepare the preview for profile picture
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
        // console.log(e.target.value)
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

    const addData = async (e) => {
        e.preventDefault();

        // const { name, mobile, email, dob, jobtype, location, picture } = inpval;

        // console.log(inpval)
        // const res = await fetch("http://localhost:5000", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify({
        //         name, mobile, email, picture, dob, jobtype, location
        //     })
        // });

        // const data = await res.json();
        // console.log(data);

        let url = `http://localhost:5000`
        const formdata = new FormData();
        formdata.append('picture', inpval.picture, inpval.picture.name);
        formdata.append('name', inpval.name)
        formdata.append('mobile', inpval.mobile)
        formdata.append('email', inpval.email)
        formdata.append('dob', inpval.dob)
        formdata.append('jobtype', inpval.jobtype)
        formdata.append('location', inpval.location)

        const res = axios.post(url, formdata);
        const data = res.json();
        // console.log("data", data);

        if (res.status === 422 || !data) {
            console.log("error ");
            alert("error");

        } else {
            alert('Thanks For Register with us');
            window.location.reload(false);
            console.log("data added");

        }
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
                                                <input type="text" name="name" value={inpval.name} onChange={setdata} className="form-control" placeholder="" aria-label="First name" for="validationDefault01"></input>
                                            </div>
                                            <div class="mb-3 col-lg-6 col-md-6 col-12 flextab">
                                                <label for="exampleInputPassword1" class="form-label">Mobile</label>
                                                <input type="number" value={inpval.mobile} onChange={setdata} name="mobile" class="form-control" id="exampleInputPassword1" />
                                            </div>
                                            {/* <div className="col-md-12 flextab">
                                                <label className="form-label">Mobile number *</label>
                                                <input type="number" name="mobile" value={inpval.mobile} onChange={setdata} className="form-control" placeholder="" aria-label="Phone number"></input>
                                            </div> */}
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
                                                        <img src="https://lh3.googleusercontent.com/LfmMVU71g-HKXTCP_QWlDOemmWg4Dn1rJjxeEsZKMNaQprgunDTtEuzmcwUBgupKQVTuP0vczT9bH32ywaF7h68mF-osUSBAeM6MxyhvJhG6HKZMTYjgEv3WkWCfLB7czfODidNQPdja99HMb4qhCY1uFS8X0OQOVGeuhdHy8ln7eyr-6MnkCcy64wl6S_S6ep9j7aJIIopZ9wxk7Iqm-gFjmBtg6KJVkBD0IA6BnS-XlIVpbqL5LYi62elCrbDgiaD6Oe8uluucbYeL1i9kgr4c1b_NBSNe6zFwj7vrju4Zdbax-GPHmiuirf2h86eKdRl7A5h8PXGrCDNIYMID-J7_KuHKqaM-I7W5yI00QDpG9x5q5xOQMgCy1bbu3St1paqt9KHrvNS_SCx-QJgBTOIWW6T0DHVlvV_9YF5UZpN7aV5a79xvN1Gdrc7spvSs82v6gta8AJHCgzNSWQw5QUR8EN_-cTPF6S-vifLa2KtRdRAV7q-CQvhMrbBCaEYY73bQcPZFd9XE7HIbHXwXYA=s200-no" className="picture-src" id="wizardPicturePreview" title=""></img>
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
                                <button type="submit" onClick={addData} className="btn btn-primary btn-md">+Add/ Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Table />
        </>
    )
}

export default Form