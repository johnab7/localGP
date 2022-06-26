import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import TextField from '@material-ui/core/TextField';

import * as yup from "yup";

import { Formik, Form } from "formik";
import CustomFormType from "./CustomFormType";

import * as AuthServices from "../Services/AuthenticationServiceHooks";

import useAxiosPrivate from "../CustomHooks/useAxiosPrivate";
import moment from "moment";
import "./CustomForm.css";


const DoctorScheduleForm= ({preloadedValues})=>{

    const [UserProfileState, setUserProfileState]= useState({firstName: "",
    lastName:"",
    email: "",
    gender:"",
    weight:"",
    height:"",
    mobileNumber:"",
    address:""});

    // const[weekSchedule, setWeekSchedule]= useState({
    //     id: null,
    //     monday:{
    //     workingHours:{
    //     startTime: "00:00",
    //     endTime: "00:00"
    //     }
    //     },
    //     tuesday:{
    //     workingHours:{
    //     startTime: "00:00",
    //     endTime: "00:00"
    //     }
    //     },
    //     wednesday:{
    //     workingHours:{
    //     startTime: "00:00",
    //     endTime: "00:00"
    //     }
    //     },
    //     thursday:{
    //     workingHours:{
    //     startTime: "00:00",
    //     endTime: "00:00"
    //     }
    //     },
    //     friday:{
    //     workingHours:{
    //     startTime: "00:00",
    //     endTime: "00:00"
    //     }
    //     },
    //     saturday: {
    //         workingHours:{
    //         startTime: "00:00",
    //         endTime: "00:00"
    //         }
    //         },
    //     sunday: {
    //         workingHours:{
    //         startTime: "00:00",
    //         endTime: "00:00"
    //         }
    //         }
    //     });
    const newState = {...preloadedValues};
    const[weekSchedule, setWeekSchedule]= useState({...preloadedValues});
    console.log("current schedule state")
    console.log(weekSchedule);
    const genderOptions =[{key:"Gender", value:""},{key:"MALE", value:"MALE"},{key:"FEMALE", value:"FEMALE"}, {key:"OTHER", value:"OTHER"}]
    
    // let authenticUser= AuthServices.getLoggedInUserName();
    const UpdateSchduleURL= '/doctor/updateDoctorSchedule';
    const axiosPrivate=useAxiosPrivate();
    const [registerationFailed, setErrMsg] = useState('');
    const errRef = useRef();

    // const getProfileData = async ()=>{
    //     try{
    //         const responsePrData= await axiosPrivate.get(UpdatePrURL);
    //         console.log(responsePrData.data);
    //         preloadedValues = responsePrData.data;
    //         //isMounted && setProfileData(responsePrData.data);
    //     }
    //     catch (err) {
    //         console.error(err);
    //         navigate('/login', { state: { from: location }, replace: true });
    //     }

    // }
    // getProfileData();
    // const navigate = useNavigate();
    // const location = useLocation();
    
    

    const updateGetSchedule = async (values) =>{
        // need to call appropriate controller and update the data 
        try{
            const response= await axiosPrivate.post(UpdateSchduleURL,weekSchedule);
            console.log(response.data);
            // const response = await axios.post(RegURL, values);
            const dataRes = response?.data;
            console.log(dataRes);
            //navigate(from, { replace: true });
        }
        catch (error) {
            if (!error?.response) {
                setErrMsg('No Server Response');
            } else if (error.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (error.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
        }
    }
    
    

    return(
        <Formik>{
            formik=>{
                return(
                    <span> 
<div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Weekly Schedule {"\n"}</div>


                        <div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Day &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Start &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; End {"\n"}</div>
                    <div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Monday &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; {TimeComponent(weekSchedule.monday.workingHours.startTime)} &nbsp; {TimeComponent(weekSchedule.monday.workingHours.endTime)} {"\n"}{"\n"}</div>
                    
                     <div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Tuesday &nbsp; &nbsp; &nbsp; &nbsp; {TimeComponent(weekSchedule.tuesday.workingHours.startTime)} &nbsp; {TimeComponent(weekSchedule.monday.workingHours.endTime)} {"\n"}{"\n"}</div>
                     <div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Wednesday &nbsp; &nbsp;{TimeComponent(weekSchedule.wednesday.workingHours.startTime)} &nbsp; {TimeComponent(weekSchedule.monday.workingHours.endTime)} {"\n"}{"\n"}</div>
                     <div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Thursday&nbsp; &nbsp; &nbsp; &nbsp; {TimeComponent(weekSchedule.thursday.workingHours.startTime)} &nbsp; {TimeComponent(weekSchedule.monday.workingHours.endTime)} {"\n"}{"\n"}</div>
                     <div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Friday &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; {TimeComponent(weekSchedule.friday.workingHours.startTime)} &nbsp; {TimeComponent(weekSchedule.monday.workingHours.endTime)} {"\n"}{"\n"}</div>
                     <div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Saturday &nbsp; &nbsp; &nbsp; &nbsp; {TimeComponent(weekSchedule.saturday.workingHours.startTime)} &nbsp; {TimeComponent(weekSchedule.saturday.workingHours.endTime)} {"\n"}{"\n"}</div>
                     <div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Sunday &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; {TimeComponent(weekSchedule.sunday.workingHours.startTime)} &nbsp; {TimeComponent(weekSchedule.sunday.workingHours.endTime)} {"\n"}{"\n"}</div>
                     
                     <div>
                     &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
                     
                     <button onClick= {updateGetSchedule}>Save</button>
                     </div>

                     </span>
                    
                )}}
            </Formik>
            // </div>
            );
}

const TimeComponent = (initTime) =>{

    return(
<TextField
        
        defaultValue={initTime}
        type="time"
        InputLabelProps={{
          shrink: true,
        }}
        // 5 minutes
        inputProps={{
          step: 300,
        }}/>
    );
}
export default DoctorScheduleForm;