import axios from "axios";
import React, { useEffect, useState } from "react";
import { get } from "react-hook-form";
//import ReactDom from "react-dom";
//import HealthLiveService from "../Services/HealthLiveService";

//import RegisterFormComponent from "./RegisterFormComponent";

export function LocalGpApiTest(){
    const [test, testState]=useState([]);
    useEffect(()=>{
        axios.get(`http://localhost:8080/api/public/test`)
        .then(testApi =>{
            console.log(testApi.data)
            console.log(sessionStorage.getItem('token'))
        })
    })
}

function LocalSurgeryHome(){
    // HealthLiveService();
    return (
        <div>
        <h1>Welcome to Local Surgery UOL</h1>

        </div>
    );

}

export default LocalSurgeryHome;
