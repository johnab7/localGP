import React, { useState } from "react";
import ReactDom from "react-dom";

function PatientLoginComponent(props){

    const [loginDetails, setLgDt]= useState({
        username: '',
        password: '',
        hasLoginFailed: false,
        showSuccessMessage: false
    });

    function handleChange(event) {
        const { name, value } = event.target;
        setLgDt(prevDetails => {
          return {
              ...prevDetails,
              [name]: value
            };
        });
    }

    function loginSubmit(event) {
        setLgDt({
        username: "",
        password: "",
        loginFailed: false,
        loginSucess: false
        });
        event.preventDefault();
    }


    return (
        <div>
            <h1> Login</h1>
            <div className="container">
                User Name: <input type="text" name="username" value={loginDetails.username} onChange={handleChange} />
                Password: <input type="password" name="password" value={loginDetails.password} onChange={handleChange} />
                <button className="btn" onClick={loginSubmit}>Login</button>
            </div>
        </div>
    );

}

export default PatientLoginComponent;
