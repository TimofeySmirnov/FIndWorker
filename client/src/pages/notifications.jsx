import React, {useContext, useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../main.jsx";
import {jwtDecode} from "jwt-decode";
import {useNavigate} from "react-router-dom";
import {HOME_ROUTE} from "../utils/consts.js";
import {getNoticeApplicant, getNoticeEmployee} from "../API/noticeAPI.js";
import NotificationCard from "../components/notice/notificationCard.jsx";
import classes from '../styles/notification.module.css'

const Notifications = observer(() => {
    const {notifications} = useContext(Context);
    const navigate = useNavigate();
    const loadNotifications = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate(HOME_ROUTE);
        }
        const decodedToken = jwtDecode(token);
        const role = decodedToken.role
        if (!role) {
            navigate(HOME_ROUTE);
        }

        if(role === 'USER'){
            await getNoticeApplicant().then(data => {notifications.setMyNotifications(data)});
            return;
        }
        if(role === 'EMPLOYEE'){
            await getNoticeEmployee().then(data => {notifications.setMyNotifications(data)});
        }
    }
    useEffect(() => {
        loadNotifications();
    }, []);
    return (
        <div className={classes.page}>
            <h2>Уведомления</h2>
            <div className={classes.notification}>
                {notifications.myNotifications.length > 0 ? (
                    notifications.myNotifications.map((notice) => (<NotificationCard key={notice.id} notification={notice} />))
                ) : <p>Уведомлений нет</p>}
            </div>
        </div>
    );
});

export default Notifications;