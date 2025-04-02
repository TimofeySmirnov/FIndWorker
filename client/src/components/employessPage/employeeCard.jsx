import React from 'react';
import dayjs from "dayjs";
import classes from './employeeMainCard.module.css'
import {useNavigate} from "react-router-dom";
import {VIEW_EMPLOYER_PROFILE_ROUTE} from "../../utils/consts.js";

const EmployeeCard = ({employee}) => {
    const navigate = useNavigate();
    const dateCreate = dayjs((employee.createdAt)).format('DD-MM-YYYY');
    const click = (id) => {
        navigate(VIEW_EMPLOYER_PROFILE_ROUTE.replace(':id', id));
    }
    return (
        <div className={classes.card} onClick={() => {click(employee.id)}}>
            <div className={classes.logo}>
                {employee.img &&
                    <img height={200} width={200} style={{borderRadius: '50%'}}
                         src={`http://localhost:5000/` + employee.img} alt={employee.name || "Фото"} />}
            </div>
            <div className={classes.dataContainer}>
                <div className={classes.mainData}>
                    <h3>{employee.name}</h3>
                    <p>На сайте с {dateCreate}</p>

                </div>
                <div className={classes.otherData}>
                    <p>{employee.description.length > 250 ? employee.description.slice(0, 250) + "..." : employee.description}</p>
                    <p>Адрес: {employee.address}</p>
                </div>
            </div>
        </div>
    );
};

export default EmployeeCard;