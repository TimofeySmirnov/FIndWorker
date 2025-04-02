import React from 'react';
import classes from "./CardMenu.module.css";
import convertDate from "../../../functions/convertDate.js";
import CustomRedButton from "../../UI/customRedButton/CustomRedButton.jsx";
import {observer} from "mobx-react-lite";

const ModerationVacancyCard = observer(({vacancy, applyFunc, rejectFunc}) => {
    return (
        <div className={classes.card}>
            <h4 className={classes.element}>{vacancy.name}</h4>
            <div className={classes.elementWithData}>
                <p>{vacancy.employee?.name}</p>
                <p>{vacancy.position?.name}</p>
            </div>
            <p className={classes.element}>Создано: {convertDate(vacancy.createdAt)}</p>
            <div className={classes.buttons}>
                <CustomRedButton onClick={() => {
                    applyFunc(vacancy.id)
                }}>Одобрить</CustomRedButton>
                <CustomRedButton onClick={() => {
                    rejectFunc(vacancy.id)
                }}>Отклонить</CustomRedButton>
            </div>
        </div>
    );
})
export default ModerationVacancyCard;