import React, { useState, useEffect } from "react";

import AdminDashboard from "./components/Dashboards/AdminDashboard";
import PatientDashboard from "./components/Dashboards/PatientDashboard";
import DoctorDashboard from "./components/Dashboards/DoctorDashboard";
import PharmacyDashboard from "./components/Dashboards/PharmacyDashboard";

import LocalSurgeryHome, {
  LocalGpApiTest,
} from "./components/LocalSurgeryHome";
import PatientLoginComponent from "./components/PatientLoginComponent";

import ErrorPage from "./components/ErrorPage";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./CSS/bootstrap.css";
import CustomLogin from "./CustomisedForms/CustomLogin";
import RegForm from "./CustomisedForms/RegForm";
import HeaderComp from "./HeaderFiles/HeaderComp";
import FooterComp from "./HeaderFiles/FooterComp";
import { AuthProvider } from "./Utilities/AuthProvider";

import DoctorRegistrationForm from "./CustomisedForms/DoctorRegistrationForm";
import DoctorUpdateForm from "./CustomisedForms/DoctorUpdateForm";
import DoctorScheduleForm from "./CustomisedForms/DoctorScheduleForm";
import DoctorWeekScheduleService from "./Services/DoctorWeekScheduleService";

import BookAppointment from "./components/bookApointment";

// import CustomNavBarD from "./HeaderFiles/navBar"
// import ChangedHeader from "./HeaderFiles/ChangedHeader";

function App() {
  return (
    <div className="surgeryHome">
      <Router>
        <AuthProvider>
          <HeaderComp />
          {/* <ChangedHeader></ChangedHeader> */}
          <Routes>
            <Route
              path="/"
              element={
                <div>
                  <LocalSurgeryHome />
                  <LocalGpApiTest />
                </div>
              }
            />
            <Route path="/login" element={<CustomLogin />} />

            <Route path="/patientlogin" element={<PatientLoginComponent />} />
            <Route path="/register" element={<RegForm />} />
            <Route path="/patient/my-account" element={<PatientDashboard />} />
            <Route
              path="/patient/book-an-appointment"
              element={<BookAppointment />}
            />

            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/addNewDoctor" element={<DoctorRegistrationForm />} />

            <Route path="/doctor/my-account" element={<DoctorDashboard />} />
            <Route
              path="/doctor/my-schedule"
              element={<DoctorWeekScheduleService />}
            />

            <Route path="/pharmacy" element={<PharmacyDashboard />} />

            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </AuthProvider>
      </Router>
      <div className="footDefault">
        <FooterComp />
      </div>
    </div>
  );
}

export default App;
