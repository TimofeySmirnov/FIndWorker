import React from 'react';
import CustomRedButton from "../../UI/customRedButton/CustomRedButton.jsx";
import classes from './employerVacCard.module.css'
import {useNavigate} from "react-router-dom";
import {RECALL_ROUTE, VACANCY_ROUTE, VIEW_APPLICANT_PROFILE_ROUTE} from "../../../utils/consts.js";

const EmployerVacancyCard = ({vacancy, changeStatus, deleteVacancy, updateVacancy}) => {
    const navigate = useNavigate();
    const clickToCard = () => {
        navigate(VACANCY_ROUTE.replace(':id', vacancy.id));
    }
    const viewRecallApplicants = () => {
        navigate(RECALL_ROUTE.replace(':id', vacancy.id));
    }
    return (
        <div className={classes.card}>
            <div className={classes.dataContainer} onClick={clickToCard}>
                <h3 className={classes.nameVacancy}>{vacancy.name.length > 100 ? vacancy.name.slice(0, 100) + "..." : vacancy.name}</h3>
                <p className={classes.othetData}>{vacancy.position?.name}</p>
                <p className={classes.othetData}>{vacancy.status}</p>
            </div>
            <div className={classes.buttonContainer}>
                <CustomRedButton onClick={viewRecallApplicants}>Посмотреть откликнувшихся</CustomRedButton>
                {vacancy.status === 'ACTIVE' || vacancy.status === 'CLOSED' ? (<CustomRedButton onClick={() => {changeStatus(vacancy.id)}}>Открыть/Закрыть вакансию</CustomRedButton>) : null}
                <CustomRedButton onClick={() => {updateVacancy(vacancy)}}>Редактировать</CustomRedButton>
                <CustomRedButton onClick={() => {deleteVacancy(vacancy.id)}}>Удалить эту вакансию</CustomRedButton>
            </div>
        </div>
    );
};

export default EmployerVacancyCard;