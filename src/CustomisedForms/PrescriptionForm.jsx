import React, { useState } from "react";

import * as yup from "yup";

import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import CustomFormType from "./CustomFormType";
import "./CustomForm.css";

function PrescriptionForm(){
    // const genderOptions =[{key:"Gender", value:""},{key:"Male", value:"Male"},{key:"Female", value:"Female"}, {key:"Others", value:"Others"}]

    const initValues= {
        diagnosis:"",
        diagnosisDescription:"",
        medicineDescription:"",
        prescriptionPeriod:"",
        // doctorUsername:"",
        // patientUsername:"",
        pharmacyName:""

    }
    const valSchema= yup.object({
        diagnosis: yup.string().min(2).max(30).required("required"),
        diagnosisDescription: yup.string().min(5).max(300).required("required"),
        medicineDescription:yup.string().min(5).max(300).required("required"),
        prescriptionPeriod:yup.number().positive().min(3).max(90).required(),
        // doctorUsername:yup.string().email().required("required"),
        // patientUsername:yup.string().email().required("required"),
        pharmacyName:yup.string().min(2).max(30).required("required"),
      })

    const onSubmit= (values)=>{
        console.log('Form data', values);
    }

return(

    <Formik initialValues={initValues} validationSchema={valSchema} onSubmit={onSubmit}>{
        formik=>{
            return(
            <Form>
            <CustomFormType
            control='input'
            type="text"
            name="diagnosis"
            label="Diagnosis"
            placeholder="Diagnosis"/>

            <CustomFormType
            control='input'
            type="text"
            name="diagnosisDescription"
            label="Diagnosis Description"
            placeholder="Diagnosis Description"/>

            <CustomFormType
            control='input'
            type="text"
            name="medicineDescripiton"
            label="Medicine and Dosage"
            placeholder="Medicine and Dosage"/>

            <CustomFormType
            control='input'
            type="number"
            name="prescriptionPeriod"
            label="Prescription Course period"
            placeholder="Max Prescription course period"/>

            <CustomFormType
            control='input'
            type="text"
            name="pharmacyName"
            label="Pharmacy Name"
            placeholder="Pharmacy Name"/>

        <button type='submit' disabled={!formik.isValid}>Register</button>
        </Form>);}}
        </Formik>);

}
export default PrescriptionForm;