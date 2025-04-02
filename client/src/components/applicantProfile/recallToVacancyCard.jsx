import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {getEmployeeById} from "../../API/employeeAPI.js";
import {VACANCY_ROUTE} from "../../utils/consts.js";
import classes from './recallToVacancyCard.module.css'

const RecallToVacancyCard = ({recall}) => {
    const [employee, setEmployee] = useState({});
    const navigate = useNavigate();
    useEffect(() => {
        getEmployeeById(recall.idEmployee).then(data => {setEmployee(data)});
    }, []);

    const click = (id) => {
        navigate(VACANCY_ROUTE.replace(':id', id));
    }
    const normalizeStatus = (statusFromDB) => {
        if (statusFromDB === 'APPROVED') {
            return (
                <p style={{color: "green"}} className={classes.item}>Приглашен</p>
            )
        }
        if (statusFromDB === 'REJECTED') {
            return (
                <p style={{color: "red"}} className={classes.item}>Отклонено</p>
            )
        }
        if (statusFromDB === 'PENDING') {
            return (
                <p style={{color: "black"}} className={classes.item}>Отправлено</p>
            )
        }
    }
    return (
        <div onClick={() => click(recall.id)} className={classes.card}>
            <h2 className={classes.bigItem}>{recall.name}</h2>
            <p className={classes.item}>{employee.name}</p>
            {normalizeStatus(recall.recall_vacancy.status)}
        </div>
    );
};

export default RecallToVacancyCard;