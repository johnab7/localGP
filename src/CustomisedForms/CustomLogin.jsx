import React, { useContext, useRef, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// import axios from "axios";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import CustomFormType from "./CustomFormType";

import AuthContext from "../Utilities/AuthProvider";
import {LoginURL} from "../Utilities/UtilServer";
import * as AuthServices from "../Services/AuthenticationServiceHooks";
import "./CustomForm.css"

import axios from "../FrontendAPIs/axios";
import useAuth from "../CustomHooks/useAuth";
const LOGIN_URL='/login';

function CustomLogin(){
    // const {setAuth} = useContext(AuthContext);
    const {setAuth}= useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const errRef = useRef();
    const [loginFailed, setErrMsg] = useState('');
    // const userRef = useRef();
    // useEffect(() => {
    //     userRef.current.focus();
    // }, [])

    
    const initVal = {
        username:"",
        password:""
    }

    const valSchema= Yup.object({
        username: Yup.string().required('Required'),
        password: Yup.string().min(4).max(20).required('Cannot be empty')
    })

    const onSubmit = async (values) =>{
        
        console.log('Form data', values)
        
        const username= values.username;
        const password = values.password;
  
        // try{
        //     const response = await axios.post(LoginURL, {
        //         username,
        //         password
        //     }
        //     );
        //     const accessToken = response?.data?.jwt;
        //     const accessRole = response?.data?.role;
        //     console.log(accessRole);
        //     AuthServices.registerationSuccessful(values.username,accessRole, accessToken);
        //     navigate(from, { replace: true });
        //     // setAuth({ username, accessToken });
        // }
        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ username, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    // withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response));
            const accessToken = response?.data?.jwt;
            const roles = response?.data?.role;
            AuthServices.registerationSuccessful(values.username, roles, accessToken);
            setAuth({ username, password, roles, accessToken });
            // setUser('');
            // setPwd('');
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
            errRef.current.focus();
        }    
    }

    return(
        <Formik initialValues={initVal}
        validationSchema= {valSchema}
        onSubmit={onSubmit}>
            {
                formik => {
                    return(
                        <Form className="loginContainer">
                            <CustomFormType control='input' type='text' lable='Username' name='username' placeholder='Username'/>
                            <CustomFormType control='input' type='password' lable='Password' name='password' placeholder='password'/>
                            <button type='submit' disabled={!formik.isValid}>Login</button>
                            <p ref={errRef} className='error' aria-live="assertive">{loginFailed}</p>
                        </Form>
                    )
                }
            }
        </Formik>
    );
}

export default CustomLogin;