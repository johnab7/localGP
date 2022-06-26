import axios from "axios";
import * as AuthServices from "../Services/AuthenticationServiceHooks";
import {LocalServerURL} from "../Utilities/UtilServer";

const authenticUser= AuthServices.getLoggedInUserName();

export function getPatientProfile(authenticUser){
    console.log("get patient profile by username")
     
    const newpatient= axios.get(`${LocalServerURL}/patient/${authenticUser}`)
    return newpatient;
}

//export const getPatientProfile= `${LocalServerURL}/${authenticUser}/profile`