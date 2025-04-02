import React, {useContext} from 'react';
import {redirect, useNavigate} from "react-router-dom";
import {
    ADMIN_ROUTE,
    HOME_ROUTE,
    LOGIN_ROUTE, NOTIFICATION_ROUTE,
    VIEW_APPLICANT_PROFILE_ROUTE,
    VIEW_EMPLOYER_PROFILE_ROUTE
} from "../utils/consts.js";
import {observer} from "mobx-react-lite";
import {Context} from "../main.jsx";
import '../styles/header.css'
import checkJwtVersion from "../functions/checkJwtVersion.js";
import {jwtDecode} from "jwt-decode";

const NavBar = observer(() => {
    const {user} = useContext(Context)
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = React.useState(false);
    const clickToIcon = () => {
        if(user.isAuth === true ){
            setIsOpen(!isOpen)
            return
        }
        navigate(LOGIN_ROUTE)
    }

    const clickToProfile = () => {
        if(user.role === 'USER' ){
            navigate(VIEW_APPLICANT_PROFILE_ROUTE.replace(':id', user.user))
            setIsOpen(false);
            return
        }
        if(user.role === 'EMPLOYEE' ){
            navigate(VIEW_EMPLOYER_PROFILE_ROUTE.replace(':id', user.user))
            setIsOpen(false);
        }
        if(user.role === 'ADMIN'){
            navigate(ADMIN_ROUTE)
            setIsOpen(false);
        }
    }

    const logout = () => {
        user.setDefault()
        setIsOpen(false);
        navigate(LOGIN_ROUTE)
    }
    const viewNotifications = () => {
        navigate(NOTIFICATION_ROUTE)
        setIsOpen(false);
    }
    return (


            <header className="Header">
                <div className="Header-container">
                    <img onClick={() => navigate(HOME_ROUTE)} src='/images/FW_logo.png' alt='logo' className="header-logo"/>
                    <h1 className='title'>Find Worker</h1>
                    <button className="btn-human" onClick={clickToIcon} ></button>
                </div>
                {isOpen && (
                    <div className="dropdown-menu">
                        <ul>
                            <li className="item" onClick={clickToProfile}>Профиль</li>
                            {user.role !== 'ADMIN' && <li className="item" onClick={viewNotifications}>Уведомления</li>}
                            <li className="item" onClick={logout}>Выйти</li>
                        </ul>
                    </div>
                )}
            </header>

    );
});

export default NavBar;