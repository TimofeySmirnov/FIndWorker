import React, {useContext, useRef, useState} from 'react';
import {Context} from "../main.jsx";
import CustomInput from "../components/UI/CustomInput/customInput.jsx";
import CustomRedButton from "../components/UI/customRedButton/CustomRedButton.jsx";
import classes from '../styles/loginPage.module.css'
import {Link, useNavigate} from "react-router-dom";
import {loginEmployee} from "../API/employeeAPI.js";
import ErrorModal from "../Modal/modalForErrors/errorModal.jsx";
import EntryApplicant from "../components/loginPage/EntryApplicant.jsx";
import EntryEmployee from "../components/loginPage/EntryEmployee.jsx";
import EntryToAdmin from "../components/loginPage/EntryToAdmin.jsx";
import {observer} from "mobx-react-lite";

const LoginPage = observer(() => {
    const {user} = useContext(Context);


    return (
        <div className={classes.loginPage}>
            {user.entry === 'APPLICANT' && (
                <EntryApplicant />
            )}
            {user.entry === 'EMPLOYEE' && (
                <EntryEmployee />
            )}
            {user.entry === 'ADMIN' && (
                <EntryToAdmin />
            )}
        </div>
    );
});

export default LoginPage;