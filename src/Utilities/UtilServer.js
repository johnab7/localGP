import axios from "axios";
export const LocalServerURL = 'http://localhost:8080';

export const RegNewPatient=`${LocalServerURL}/registration/new`;

export const RegNewDoctor=`${LocalServerURL}/admin/new-doctor`;

export const LoginURL= `${LocalServerURL}/login`;


//export const getPatientProfile= `${LocalServerURL}/`

//export function getPatientProfile(authenticUser){return axios.get(`${LocalServerURL}/patient/${authenticUser}`)}