import React from 'react';
import CustomRedButton from "../../components/UI/customRedButton/CustomRedButton.jsx";
import classes from './errorModal.module.css'

const ErrorModal = ({message, onClose }) => {
    return (
        <div className={classes.overlay}>
            <div className={classes.modal}>
                <p>{message}</p>
                <CustomRedButton onClick={onClose}>Закрыть</CustomRedButton>
            </div>
        </div>
    );
};

export default ErrorModal;