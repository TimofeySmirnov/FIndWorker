import React from 'react';
import classes from './ModalAccess.module.css';

const ModalAccess = ({message, onClose}) => {
    return (
        <div className={classes.modal}>
            <p>{message}</p>
            <button className={classes.buttonClose} onClick={onClose}>X</button>
        </div>
    );
};

export default ModalAccess;