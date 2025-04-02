import React from 'react';
import dayjs from "dayjs";
import classes from './mainVacancyCard.module.css'
import {useNavigate} from "react-router-dom";
import {VACANCY_ROUTE} from "../../../utils/consts.js";

const MainVacancyCard = ({vacancy}) => {
    const navigate = useNavigate();
    const resultPayment = (data) => {
        if(data?.minimumPayment && data?.maximumPayment) {
            return (<p>От {data?.minimumPayment} {data?.currency?.symbol} до {data?.maximumPayment} {data?.currency?.symbol}</p>);
        }
        if(data?.minimumPayment && !data?.maximumPayment) {
            return (<p>От {data?.minimumPayment} {data?.currency?.symbol}</p>);
        }
        if(!data?.minimumPayment && data?.maximumPayment) {
            return (<p>До {data?.maximumPayment} {data?.currency?.symbol}</p>);
        }
        return (<p>Зарплата не указана</p>)
    }
    const dateCreateVacancy = dayjs((vacancy.createdAt)).format('DD-MM-YYYY');

    const clickToCard = (id) => {
        navigate(VACANCY_ROUTE.replace(':id', id));
    }

    return (
        <div className={classes.card} onClick={() => {clickToCard(vacancy.id)}}>
            <h2>{vacancy.name}</h2>
            <p>Размещено: {dateCreateVacancy}</p>
            <div className={classes.otherData}>
                {resultPayment(vacancy)}
                {vacancy.work_experience && <p>Опыт {vacancy.work_experience.name}</p>}
                {vacancy.work_format && <p>{vacancy.work_format.name}</p>}
                {vacancy.busyness && <p>{vacancy.busyness.nameBusyness}</p>}
            </div>
            <div>
                <h3>{vacancy.employee.name}</h3>
                <p>{vacancy.address}</p>
            </div>
        </div>
    );
};

export default MainVacancyCard;