import React from 'react';
import convertDate from "../../functions/convertDate.js";
import classes from './noticeCard.module.css'

const NotificationCard = ({notification}) => {
    return (
        <div className={classes.card}>
            <h4>{notification.body}</h4>
            <p>{convertDate(notification.createdAt)}</p>
        </div>
    );
};

export default NotificationCard;