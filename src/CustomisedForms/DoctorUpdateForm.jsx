import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import * as yup from "yup";

import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import CustomFormType from "./CustomFormType";

import * as AuthServices from "../Services/AuthenticationServiceHooks";

import useAxiosPrivate from "../CustomHooks/useAxiosPrivate";
import moment from "moment";
import "./CustomForm.css";


const DoctorUpdateForm= ({preloadedValues})=>{
    
    const genderOptions =[{key:"Gender", value:""},{key:"MALE", value:"MALE"},{key:"FEMALE", value:"FEMALE"}, {key:"OTHER", value:"OTHER"}]
    
    let authenticUser= AuthServices.getLoggedInUserName();
    const UpdatePrURL= '/doctor/'+authenticUser+'/update';
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
            type="text"
            name="department"
            readOnly={true}
            label='Department'
            placeholder="Department"
        />
        <CustomFormType control='input'
            type="text"
            name="roomNumber"
            readOnly={true}
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
    
            <button type='submit' disabled={!formik.isValid}>Update</button>
            </Form>);}}
            </Formik>
            // </div>
            );
}

export default DoctorUpdateForm;