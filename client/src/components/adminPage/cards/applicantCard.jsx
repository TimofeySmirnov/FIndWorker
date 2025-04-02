import React from 'react';
import classes from "./CardMenu.module.css";
import convertDate from "../../../functions/convertDate.js";
import CustomRedButton from "../../UI/customRedButton/CustomRedButton.jsx";
import {observer} from "mobx-react-lite";

const ApplicantCard = observer(({applicant, deleteFunc}) => {

    return (
        <div className={classes.card}>
            <div className={classes.elementWithData}>
                <p>{applicant.lastName}</p>
                <p>{applicant.firstName}</p>
                <p>{applicant.middleName}</p>
            </div>
            <div className={classes.elementWithData}>
                <p>Email: {applicant.email}</p>
                <p>Телефон: {applicant.phoneNumber}</p>
            </div>
            <p className={classes.element}>Зарегистрирован: {convertDate(applicant.createdAt)}</p>
            <div className={classes.buttons}>
                <CustomRedButton onClick={() => {deleteFunc(applicant.id)}}>Удалить</CustomRedButton>
            </div>
        </div>
    );
});

export default ApplicantCard;