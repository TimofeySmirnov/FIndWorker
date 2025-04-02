import React from 'react';
import convertDate from "../../../functions/convertDate.js";
import CustomRedButton from "../../UI/customRedButton/CustomRedButton.jsx";
import classes from './CardMenu.module.css'
import {observer} from "mobx-react-lite";

const BusynessCard = observer(({busyness, updateModal, deleteFunc}) => {

    return (
        <div className={classes.card}>
            <h4 className={classes.element}>{busyness.nameBusyness}</h4>
            <p className={classes.element}>Создано: {convertDate(busyness.createdAt)}</p>
            <div className={classes.buttons}>
                <CustomRedButton onClick={() => {updateModal(busyness)}}>Редактировать</CustomRedButton>
                <CustomRedButton onClick={() => {deleteFunc(busyness.id)}}>Удалить</CustomRedButton>
            </div>
        </div>
    );
});

export default BusynessCard;