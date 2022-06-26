import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
//import React from "react";
import DoctorUpdateForm from "../../CustomisedForms/DoctorUpdateForm";


import * as AuthServices from "../../Services/AuthenticationServiceHooks";
import useAxiosPrivate from "../../CustomHooks/useAxiosPrivate";
import "../../CustomisedForms/CustomForm.css";

function DoctorDashboard(){
    let authenticUser= AuthServices.getLoggedInUserName();
    const getPrURL='/doctor/'+authenticUser;

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
        profileData ? <DoctorUpdateForm preloadedValues={profileData}/> : <div>Loading...</div>
    );
}

export default DoctorDashboard;