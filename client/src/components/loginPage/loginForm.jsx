import React from 'react';
import CustomInput from "../UI/CustomInput/customInput.jsx";
import CustomRedButton from "../UI/customRedButton/CustomRedButton.jsx";
import {Link} from "react-router-dom";
import classes from './entryPagesStyles.module.css'

const LoginForm = ({onchangeEmail, onChangePassword, onSubmit, onChangeSecretKey}) => {
    return (
        <form className={classes.loginForm}>
            <CustomInput type="email" placeholder="Введите email" onChange={(e) => onchangeEmail(e.target.value)} />
            <CustomInput type="password" placeholder="Введите пароль" onChange={(e) => onChangePassword(e.target.value)} />
            {onChangeSecretKey && (
                <CustomInput placeholder="" onChange={(e) => onChangeSecretKey(e.target.value)} />
            )}
            <CustomRedButton onClick={(event) => onSubmit(event)}>Войти</CustomRedButton>
            <p>Нажимая войти вы подтверждаете, что полностью принимаете условия
                <Link to={'https://hh.ru/account/agreement?backurl=%2Faccount%2Fsignup%3Fbackurl%3D%252F&hhtmFrom=account_login'}> соглашения </Link>
                и ознакомились с
                <Link to={'https://hh.ru/article/personal_data?backurl=%2F&hhtmFrom=account_login'}> политикой конфиденциальности</Link> </p>
        </form>
    );
};

export default LoginForm;