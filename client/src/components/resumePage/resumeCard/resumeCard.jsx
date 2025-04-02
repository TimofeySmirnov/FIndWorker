import React from 'react';
import classes from './resumeCard.module.css'
import dayjs from "dayjs";
import {useNavigate} from "react-router-dom";
import {RESUME_ROUTE} from "../../../utils/consts.js";

const ResumeCard = ({resume}) => {
    const navigate = useNavigate();
    const dateCreated = dayjs(Date(resume.createdAt)).format('DD-MM-YYYY');
    const dateUpdated = dayjs(Date(resume.updatedAt)).format('DD-MM-YYYY');
    const click = () => {
        navigate(RESUME_ROUTE.replace(':id', resume.id));
    }
    return (
        <div className={classes.card} onClick={click}>
            <h2>{resume.position.name}</h2>
            <p>Создано: {dateCreated}</p>
            <p>Обновлено: {dateUpdated}</p>
        </div>
    );
};

export default ResumeCard;