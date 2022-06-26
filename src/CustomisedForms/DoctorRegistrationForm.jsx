import React, { useContext, useRef, useState } from "react";

import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import CustomFormType from "./CustomFormType";

import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

import {LocalServerURL} from "../Utilities/UtilServer";


import * as AuthServices from "../Services/AuthenticationServiceHooks";
import useAxiosPrivate from "../CustomHooks/useAxiosPrivate";
import AuthContext from "../Utilities/AuthProvider";
import "./CustomForm.css";


function DoctorRegistrationForm(){

    //const {setAuth} = useContext(AuthContext);
    const axiosPrivate=useAxiosPrivate();
    let authenticUser= AuthServices.getLoggedInUserName();
    const DocRegURL= '/admin/newdoctor';

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const [registerationFailed, setErrMsg] = useState('');
    //const [success, setSuccess] = useState(null);

    const errRef = useRef();

    const genderOptions =[{key:"Gender", value:""},{key:"MALE", value:"MALE"},{key:"FEMALE", value:"FEMALE"}, {key:"OTHER", value:"OTHER"}]

    const initValues= {
        firstName: "",
        lastName:"",
        email: "",
        username:"",
        password:"",
        confirmPassword:"",
        dateOfBirth:"",
        genderoptions:"",
        mobileNumber:"",
        address:"",

        department:"",
        roomNumber:""
    }
    const valSchema= yup.object({
        firstName: yup.string().min(2).max(15).required("required"),
        lastName: yup.string().min(2).max(15).required("required"),
        email: yup.string().email().required("required"),
        username: yup.string().matches(/^[a-zA-Z0-9_]+$/, "Only alphabets and numbers are allowed for this field ").required("required"),
        password: yup.string().min(4).max(15).required('required'),
        confirmPassword: yup.string().required("Please confirm your password").when("password", {is: (val) => (val && val.length > 0 ? true : false),then: yup
            .string().oneOf([yup.ref("password")], "Password does not match")}),
        dateOfBirth: yup.date().required('required'),
        genderoptions: yup.string().required("Must provide a gender"),
        
        mobileNumber: yup.number().positive().integer().test('len', 'Must be exactly 10 characters', (val) => { if(val) return val.toString().length === 10; }).required(),
        address: yup.string().max(30).required(),

        department: yup.string().max(30).required(),
        roomNumber: yup.string().max(5).required()
      })

    const onSubmit= async (values)=>{
        console.log('Form data', values);
        // const jsonvalues= JSON.stringify(values);
        // console.log(jsonvalues);
        try{
            const response = await axiosPrivate.post(DocRegURL,
                values);
            const dataRes = response?.data;
            console.log(dataRes);
            navigate(from, { replace: true });
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
            <h3>Doctor Registration</h3>
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
            label="Username"
            name="username"
            placeholder="Username"/>

        <CustomFormType control='input'
            type="password"
            name="password"
            label="Password"
            placeholder="Password"
        />
        <CustomFormType control='input'
            type="password"
            name="confirmPassword"
            label="Confirm Password"
            placeholder="Confirm Password"
        />
        
        <CustomFormType control='input'
            type="date"
            name="dateOfBirth"
            label="Date of Birth"
            placeholder="Date of Birth"
        />
        
        <CustomFormType control= 'select'
            label='Gender'
            name='genderoptions'
            options={genderOptions}
        />
        
        <CustomFormType control='input'
            type="text"
            name="department"
            label='Department'
            placeholder="Department"
        />
        <CustomFormType control='input'
            type="text"
            name="roomNumber"
            label='Room Number'
            placeholder="Room Number"
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

        <button type='submit' disabled={!formik.isValid}>Register</button>
        <p ref={errRef} className='error' aria-live="assertive">{registerationFailed}</p>
        </Form>);}}
        </Formik>);

}
export default DoctorRegistrationForm;