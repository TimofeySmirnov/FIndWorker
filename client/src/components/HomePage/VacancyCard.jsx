import React from 'react';
import classes from './vacancyCard.module.css'
import {useNavigate} from "react-router-dom";
import {VACANCY_ROUTE} from "../../utils/consts.js";
import CustomRedButton from "../UI/customRedButton/CustomRedButton.jsx";
const VacancyCard = ({vacancy}) => {
    const navigate = useNavigate();
    const clickToVacancy = (id) => {
            const vacancyToNavigate = VACANCY_ROUTE.replace(':id', id)
            navigate(vacancyToNavigate)
    }
    const paymentInfo = (() => {
        if (vacancy.minimumPayment && vacancy.maximumPayment) {
            return `От ${vacancy.minimumPayment} ${vacancy.currency.symbol} до ${vacancy.maximumPayment} ${vacancy.currency.symbol}`;
        }
        if (vacancy.minimumPayment) {
            return `От ${vacancy.minimumPayment} ${vacancy.currency.symbol}`;
        }
        if (vacancy.maximumPayment) {
            return `До ${vacancy.maximumPayment} ${vacancy.currency.symbol}`;
        }
        return "Зарплата не указана";
    })();
    return (
        <div className={classes.vacancyCard} onClick={() => {
            clickToVacancy(vacancy.id)
        }}>
            <h2>{vacancy.name.length > 90 ? vacancy.name.slice(0, 90) + "..." : vacancy.name}</h2>
            <p className={classes.description}>{vacancy.description.length > 150 ? vacancy.description.slice(0, 150) + "..." : vacancy.description}</p>
            <p>{paymentInfo}</p>
        </div>
    );
};

export default VacancyCard;