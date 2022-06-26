import React, { useState, useEffect, useContext } from 'react';
import {
  CustomNav,
  CustomNavLink,
  CustomNavBar,
  CustomMenu,
  CustomBtnLink,
  CustomNavHome
} from './HeaderReactDesign';

import * as AuthServices from "../Services/AuthenticationServiceHooks";
import AuthContext from '../Utilities/AuthProvider';
import useAuth from "../CustomHooks/useAuth";




const HeaderComp = () => {
  const [headState, setHeadState]= useState();
  const userna= useContext(AuthContext);
  console.log(userna);

  const loggedIn= AuthServices.isUserLoggedIn();
  //const { auth } = useAuth();
  //const configname =auth?.username;

  const loggedRole= AuthServices.getLoggedInUserRole();
  //{loggedIn && setHeadState(loggedIn)}
  console.log(loggedIn);
  return (
    <div>
    
      <CustomNav>
        <CustomNavHome to='/'>
          <img style={{height:'80px'}} src={require('../../src/images/UOLSurgeryLogo.png')} alt='logo' />
        </CustomNavHome>
        <CustomNavBar />
        <CustomMenu>
          <CustomNavLink to='/patient/book-an-appointment' activestyle="true">
            Appointment
          </CustomNavLink>


          
          {
            loggedRole==='DOCTOR' && <CustomNavLink to='/doctor/my-account' activestyle="true">
            My Account
          </CustomNavLink>
          }

          {
            loggedRole==='DOCTOR' && <CustomNavLink to='/doctor/my-schedule' activestyle="true">
            Week Schedule
          </CustomNavLink>
          }

          {loggedRole==='ADMIN' &&
          <CustomNavLink to='/addNewDoctor' activestyle="true">
            Register Doctor
          </CustomNavLink>}

          

          {loggedRole==='PATIENT' &&
          <CustomNavLink to='/patient/my-account' activestyle="true">
            My Account
          </CustomNavLink>}
          {!loggedIn && <CustomNavLink to='/register' activestyle="true">
            Register
          </CustomNavLink>}
          
          {!loggedIn && <CustomBtnLink to='/login'>Sign In</CustomBtnLink>}

          {loggedIn && <CustomBtnLink to='/' onClick={AuthServices.logout}>Sign Out</CustomBtnLink>}
        </CustomMenu>
      </CustomNav>
    </div>
  );
};

export default HeaderComp;

