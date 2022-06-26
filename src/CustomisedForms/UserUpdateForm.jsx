import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import * as yup from "yup";

import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import CustomFormType from "./CustomFormType";

import * as AuthServices from "../Services/AuthenticationServiceHooks";

import useAxiosPrivate from "../CustomHooks/useAxiosPrivate";
import moment from "moment";
import "./CustomForm.css";

// import axios from "../FrontendAPIs/axios";
// import useAuth from "../FrontendAPIs/UseAuth";

// import axios from "axios";
// export const LocalServerURL = 'http://localhost:8080';


const UserUpdateForm= ({preloadedValues})=>{
    
    const genderOptions =[{key:"Gender", value:""},{key:"MALE", value:"MALE"},{key:"FEMALE", value:"FEMALE"}, {key:"OTHER", value:"OTHER"}]
    
    let authenticUser= AuthServices.getLoggedInUserName();
    const UpdatePrURL= '/patient/'+authenticUser+'/update';
    const axiosPrivate=useAxiosPrivate();

    const navigate = useNavigate();
    const location = useLocation();
    
    const [registerationFailed, setErrMsg] = useState('');
    const errRef = useRef();
    //converting date
    const d = preloadedValues.dateOfBirth;
    const convertedDate = moment(d).format("YYYY-MM-DD");
    console.log(convertedDate);
    
    const newState = {...preloadedValues};
        delete newState['dateOfBirth'];
        console.log(newState)
    
    const convertedDob= {'dateOfBirth':convertedDate}
    const newState2 = {...newState, ...convertedDob}

    console.log('newstate2',newState2);
    const initValues= newState2;

    const valSchema= yup.object({
        firstName: yup.string().min(2).max(15).required("required"),
        lastName: yup.string().min(2).max(15).required("required"),
        email: yup.string().email().required("required"),
        genderoptions: yup.string().required("Must provide a gender"),
        weight: yup.number().positive().min(2).max(200).required(),
        height: yup.number().positive().min(30).max(280).required(),
        mobileNumber: yup.number().positive().integer().test('len', 'Must be exactly 10 characters', (val) => { if(val) return val.toString().length === 10; }).required(),
        address: yup.string().max(30).required()
      })

    const onSubmit= async (values)=>{
        console.log('Form data', values);
        
        try{
            const response= await axiosPrivate.post(UpdatePrURL,values);
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
    <Formik initialValues={initValues} validationSchema={valSchema} onSubmit={onSubmit}>{
        formik=>{
            return(
            <Form className="registerContainer">
            {/* <p ref={errRef} className='error' aria-live="assertive">{fetchFailed}</p> */}
            <CustomFormType
            control='input'
            type="text"
            label="First Name"
            name="firstName"
            placeholder="First Name"/>

        <CustomFormType control='input'
            type="text"
            label="Last Name"
            name="lastName"
            placeholder="Last Name"/>

<CustomFormType control='input'
            type="text"
            label="Email"
            name="email"
            placeholder="Email"/>

<CustomFormType control='input'
            type="text"
            readOnly={true}
            label="Username"
            name="username"
            placeholder="Username"/>
        
        <CustomFormType control='input'
            type="date"
            readOnly={true}
            name="dateOfBirth"
            label="Date of Birth"
            placeholder="Date of Birth"
        />
        
        <CustomFormType control= 'input'
            label='Gender'
            readOnly={true}
            name='genderoptions'
            
        />
        
        <CustomFormType control='input'
            type="number"
            readOnly={true}
            name="nhsNumber"
            label="Health inssurance number"
            placeholder="Health inssurance number"
        />
        <CustomFormType control='input'
            type="number"
            name="weight"
            label="Weight"
            placeholder="Weight in Kilo"
        />
        <CustomFormType control='input'
            type="number"
            name="height"
            label="Height"
            placeholder="Height in Centi-meters"
        />

        <CustomFormType control='input'
            type="number"
            name="mobileNumber"
            label="Mobile Number"
            placeholder="Mobile Number"
        />
        
        <CustomFormType control='input'
            type="text"
            name="address"
            label='Address'
            placeholder="Address"
        />

        <button type='submit' disabled={!formik.isValid}>Update</button>
        </Form>);}}
        </Formik>
        // </div>
        );

}
export default UserUpdateForm;