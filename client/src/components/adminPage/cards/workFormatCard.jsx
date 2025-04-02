import React from 'react';
import classes from "./CardMenu.module.css";
import convertDate from "../../../functions/convertDate.js";
import CustomRedButton from "../../UI/customRedButton/CustomRedButton.jsx";
import {observer} from "mobx-react-lite";

const WorkFormatCard = observer(({workFormat, updateModal, deleteFunc}) => {
    return (
        <div className={classes.card}>
            <h4 className={classes.element}>{workFormat.name}</h4>
            <p className={classes.element}>Создано: {convertDate(workFormat.createdAt)}</p>
            <div className={classes.buttons}>
                <CustomRedButton onClick={() => {
                    updateModal(workFormat)
                }}>Редактировать</CustomRedButton>
                <CustomRedButton onClick={() => {
                    deleteFunc(workFormat.id)
                }}>Удалить</CustomRedButton>
            </div>
        </div>
    );
})
export default WorkFormatCard;