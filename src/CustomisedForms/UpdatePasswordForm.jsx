import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import CustomFormType from "./CustomFormType";

function UpdatePasswordForm(){
    const initVal = {
        email:"",
        password:"",
        newPassword:"",
    }

    const valSchema= Yup.object({
        email: Yup.string().email('Invalid').required('Required'),
        password: Yup.string().min(4).max(20).required('Cannot be empty'),
        newPassword: Yup.string().min(4).max(20).required('Cannot be empty')
    })

    const onSubmit = values =>{
        console.log('Form data', values)    
    }

    return(
        <Formik initialValues={initVal}
        validationSchema= {valSchema}
        onSubmit={onSubmit}>
            {
                formik => {
                    return(
                        <Form>
                            <CustomFormType control='input' type='email' lable='Email' name='email' placeholder='email'/>
                            <CustomFormType control='input' type='password' lable='Password' name='password' placeholder='Old password'/>
                            <CustomFormType control='input' type='password' lable='Password' name='newPassword' placeholder='New Password'/>
                            <button type='submit' disabled={!formik.isValid}>Login</button>
                        </Form>
                    )
                }
            }
        </Formik>
    );
}

export default UpdatePasswordForm;