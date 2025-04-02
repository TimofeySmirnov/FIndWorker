import React from 'react';
import classes from "./CardMenu.module.css";
import convertDate from "../../../functions/convertDate.js";
import CustomRedButton from "../../UI/customRedButton/CustomRedButton.jsx";
import {observer} from "mobx-react-lite";

const CurrencyCard = observer(({currency, updateModal, deleteFunc}) => {
    return (
        <div className={classes.card}>
            <h4 className={classes.element}>{currency.currency}</h4>
            <h4 className={classes.element}>{currency.symbol}</h4>
            <p className={classes.element}>Создано: {convertDate(currency.createdAt)}</p>
            <div className={classes.buttons}>
                <CustomRedButton onClick={() => {
                    updateModal(currency)
                }}>Редактировать</CustomRedButton>
                <CustomRedButton onClick={() => {
                    deleteFunc(currency.id)
                }}>Удалить</CustomRedButton>
            </div>
        </div>
    );
});

export default CurrencyCard;