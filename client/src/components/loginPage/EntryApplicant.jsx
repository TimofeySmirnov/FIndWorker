import React, {use, useContext, useState} from 'react';
import LoginForm from "./loginForm.jsx";
import CustomRedButton from "../UI/customRedButton/CustomRedButton.jsx";
import {Link, useNavigate} from "react-router-dom";
import {HOME_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE} from "../../utils/consts.js";
import {Context} from "../../main.jsx";
import {loginApplicant} from "../../API/applicantAPI.js";
import ErrorModal from "../../Modal/modalForErrors/errorModal.jsx";
import classes from './entryPagesStyles.module.css'
import {observer} from "mobx-react-lite";
import ModalAccess from "../../Modal/modalAccess/modalAccess.jsx";

const EntryApplicant = observer(() => {
    const navigate = useNavigate();
    const {user} = useContext(Context)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [accessModalOpen, setAccessModalOpen] = useState(false);

    const onChangeEmail = (email) => {
        setEmail(email);
    }
    const onChangePassword = (email) => {
        setPassword(email);
    }
    let data
    const onSubmit = async (e) =>{
        e.preventDefault();
        try{
            data = await loginApplicant(email, password)

            user.setUser(data.id);
            user.setRole(data.role);
            user.setIsAuth(true)
            setMessage("Вход выполнен");
            setAccessModalOpen(true)
            setTimeout(setAccessModalOpen(false), 5000)
            navigate(HOME_ROUTE);
        }
        catch(error){
            setModalOpen(true);
            console.log(error);
            setError(error.response.data.message);
        }
    }

    const redirectToEmployee = () => {
        user.setEntry('EMPLOYEE')
        navigate(LOGIN_ROUTE);

    }
    const redirectToAdmin = () => {
        user.setEntry('ADMIN')

    }
    return (
        <div>
            <div className={classes.entryForm}>
                <h2>Я ищу работу</h2>
                <LoginForm onchangeEmail={onChangeEmail} onChangePassword={onChangePassword} onSubmit={onSubmit}/>
                <p>Нет аккаунта? <Link to={REGISTRATION_ROUTE}>Зарегистрироваться</Link></p>
            </div>
            <div className={classes.anotherLoginForm}>
                <CustomRedButton onClick={redirectToEmployee}>Я ищу сотрудников</CustomRedButton>
                <Link to={LOGIN_ROUTE} onClick={redirectToAdmin}>Войти как администратор</Link>
            </div>
            {modalOpen && <ErrorModal message={error} onClose={() => setModalOpen(false)} />}
            {accessModalOpen && <ModalAccess message={message} onClose={() => setAccessModalOpen(false)} />}
        </div>
    );
});

export default EntryApplicant;