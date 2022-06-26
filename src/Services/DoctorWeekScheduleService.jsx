import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
//import React from "react";
import DoctorScheduleForm from "../CustomisedForms/DoctorScheduleForm";


import * as AuthServices from "../Services/AuthenticationServiceHooks";
import useAxiosPrivate from "../CustomHooks/useAxiosPrivate";
import "../CustomisedForms/CustomForm.css";


function DoctorWeekScheduleService(){

    let authenticUser= AuthServices.getLoggedInUserName();
    const getPrURL='/doctor/'+authenticUser+'/getDoctorSchedule';

    const [UserProfileState, setUserProfileState]= useState({firstName: "",
    lastName:"",
    email: "",
    gender:"",
    weight:"",
    height:"",
    mobileNumber:"",
    address:""});

    const[weekSchedule, setWeekSchedule]= useState({
        id: null,
        monday:{
        workingHours:{
        startTime: "00:00",
        endTime: "00:00"
        }
        },
        tuesday:{
        workingHours:{
        startTime: "00:00",
        endTime: "00:00"
        }
        },
        wednesday:{
        workingHours:{
        startTime: "00:00",
        endTime: "00:00"
        }
        },
        thursday:{
        workingHours:{
        startTime: "00:00",
        endTime: "00:00"
        }
        },
        friday:{
        workingHours:{
        startTime: "00:00",
        endTime: "00:00"
        }
        },
        saturday: {
            workingHours:{
            startTime: "00:00",
            endTime: "00:00"
            }
            },
        sunday: {
            workingHours:{
            startTime: "00:00",
            endTime: "00:00"
            }
            }
        });
    

    const [profileData, setProfileData] = useState();

    const axiosPrivate=useAxiosPrivate();

    const navigate = useNavigate();
    const location = useLocation();
    

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getProfileData = async ()=>{
            try{
                const responsePrData= await axiosPrivate.get(getPrURL,{
                    signal: controller.signal
                });
                console.log(responsePrData.data);
                isMounted && setProfileData(responsePrData.data);
            }
            catch (err) {
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true });
            }
        }
        getProfileData();
        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])
    
    console.log(profileData);

    return( 
        profileData ? <DoctorScheduleForm preloadedValues={profileData}/> : <div>Loading...</div>
    );
}

export default DoctorWeekScheduleService;