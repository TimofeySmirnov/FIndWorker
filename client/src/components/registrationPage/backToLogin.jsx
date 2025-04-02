import React from 'react';
import classes from "./registration.module.css";
import CustomRedButton from "../UI/customRedButton/CustomRedButton.jsx";
import {LOGIN_ROUTE} from "../../utils/consts.js";
import {useNavigate} from "react-router-dom";

const BackToLogin = () => {
    const navigate = useNavigate();
    const backToLogin = () => {
        navigate(LOGIN_ROUTE);
    }

    return (
        <div className={classes.anotherLoginForm}>
            <CustomRedButton onClick={backToLogin}>Назад ко входу</CustomRedButton>
        </div>
    );
};

export default BackToLogin;