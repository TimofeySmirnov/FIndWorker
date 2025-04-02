import React from 'react';
import classes from "./CardMenu.module.css";
import convertDate from "../../../functions/convertDate.js";
import CustomRedButton from "../../UI/customRedButton/CustomRedButton.jsx";
import {observer} from "mobx-react-lite";

const PositionCard = observer(({position, updateModal, deleteFunc}) => {
    return (
        <div className={classes.card}>
            <h4 className={classes.element}>{position.name}</h4>
            <p className={classes.element}>Создано: {convertDate(position.createdAt)}</p>
            <div className={classes.buttons}>
                <CustomRedButton onClick={() => {
                    updateModal(position)
                }}>Редактировать</CustomRedButton>
                <CustomRedButton onClick={() => {
                    deleteFunc(position.id)
                }}>Удалить</CustomRedButton>
            </div>
        </div>
    );
});
export default PositionCard;