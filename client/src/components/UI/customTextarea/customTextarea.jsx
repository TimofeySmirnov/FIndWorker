import React from 'react';
import classes from "../CustomInput/cutomInput.module.css";

const CustomTextarea = React.forwardRef((props, ref) => {
    return (
        <div>
            <textarea ref={ref} style={props.style} className={classes.myInput} {...props}/>
        </div>
    );
});

export default CustomTextarea;