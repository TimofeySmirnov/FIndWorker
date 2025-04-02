import React from 'react';

import convertDate from "../../../functions/convertDate.js";
import CustomRedButton from "../../UI/customRedButton/CustomRedButton.jsx";
import classes from './CardMenu.module.css'
import {observer} from "mobx-react-lite";

const WorkExpCard = observer(({workExp, updateModal, deleteFunc}) => {
    return (
        <div className={classes.card}>
            <h4 className={classes.element}>{workExp.name}</h4>
            <p className={classes.element}>Создано: {convertDate(workExp.createdAt)}</p>
            <div className={classes.buttons}>
                <CustomRedButton onClick={() => {updateModal(workExp)}}>Редактировать</CustomRedButton>
                <CustomRedButton onClick={() => {deleteFunc(workExp.id)}}>Удалить</CustomRedButton>
            </div>
        </div>
    );
});

export default WorkExpCard;