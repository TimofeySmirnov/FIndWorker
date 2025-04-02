import React from 'react';
import classes from './customRedBtn.module.css'

const CustomRedButton = ({children, ...props}) => {
    return (
        <button {...props} className={classes.customRedBtn}>
            {children}
        </button>
    );
};

export default CustomRedButton;