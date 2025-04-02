import React, {useContext} from 'react';
import {Context} from "../main.jsx";
import classes from "../styles/loginPage.module.css";
import EntryApplicant from "../components/loginPage/EntryApplicant.jsx";
import EntryEmployee from "../components/loginPage/EntryEmployee.jsx";
import EntryToAdmin from "../components/loginPage/EntryToAdmin.jsx";
import {observer} from "mobx-react-lite";
import RegistrationApplicant from "../components/registrationPage/registrationApplicant.jsx";
import RegistrationEmployee from "../components/registrationPage/registrationEmployee.jsx";
import RegistrationAdmin from "../components/registrationPage/registrationAdmin.jsx";

const RegistrationPage = observer(() => {

    const {user} = useContext(Context);


    return (
        <div className={classes.loginPage}>
            {user.entry === 'APPLICANT' && (
                <RegistrationApplicant />
            )}
            {user.entry === 'EMPLOYEE' && (
                <RegistrationEmployee />
            )}
            {user.entry === 'ADMIN' && (
                <RegistrationAdmin />
            )}
        </div>
    );
});


export default RegistrationPage;