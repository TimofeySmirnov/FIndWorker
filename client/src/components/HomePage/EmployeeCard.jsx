import React from 'react';
import classes from './employeeCard.module.css'
import {useNavigate} from "react-router-dom";
import {VIEW_EMPLOYER_PROFILE_ROUTE} from "../../utils/consts.js";

const EmployeeCard = ({employee}) => {
    const navigate = useNavigate();
    const click = () => {
        navigate(VIEW_EMPLOYER_PROFILE_ROUTE.replace(':id', employee.id));
    }
    return (
        <div className={classes.employeeCard} onClick={click}>
            <p>{employee.name} - {employee.vacancyCount} вакансий</p>
        </div>
    );
};

export default EmployeeCard;