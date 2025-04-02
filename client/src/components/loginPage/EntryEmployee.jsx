import React, {useContext, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Link, useNavigate} from "react-router-dom";
import {Context} from "../../main.jsx";
import {loginApplicant} from "../../API/applicantAPI.js";
import {
    HOME_ROUTE,
    LOGIN_ROUTE,
    REGISTRATION_ROUTE
} from "../../utils/consts.js";
import classes from "./entryPagesStyles.module.css";
import LoginForm from "./loginForm.jsx";
import CustomRedButton from "../UI/customRedButton/CustomRedButton.jsx";
import ErrorModal from "../../Modal/modalForErrors/errorModal.jsx";
import {loginEmployee} from "../../API/employeeAPI.js";

const EntryEmployee = observer(() => {
    const navigate = useNavigate();
    const {user} = useContext(Context)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [modalOpen, setModalOpen] = useState(false);

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
            data = await loginEmployee(email, password)
            user.setUser(data.id);
            user.setRole(data.role);
            user.setIsAuth(true)
            navigate(HOME_ROUTE)
        }
        catch(error){
            setModalOpen(true);
            console.log(error);
            setError(error.response.data.message);
        }
    }

    const redirectToApplicant = () => {
        user.setEntry('APPLICANT')
        navigate(LOGIN_ROUTE);
    }
    const redirectToAdmin = () => {
        user.setEntry('ADMIN')
    }
    return (
        <div>
            <div className={classes.entryForm}>
                <h2>Я ищу сотрудников</h2>
                <LoginForm onchangeEmail={onChangeEmail} onChangePassword={onChangePassword} onSubmit={onSubmit}/>
                <p>Нет аккаунта? <Link to={REGISTRATION_ROUTE}>Зарегистрироваться</Link></p>
            </div>
            <div className={classes.anotherLoginForm}>
                <CustomRedButton onClick={redirectToApplicant}>Я ищу работу </CustomRedButton>
                <Link to={LOGIN_ROUTE} onClick={redirectToAdmin}>Войти как администратор</Link>
            </div>
            {modalOpen && <ErrorModal message={error} onClose={() => setModalOpen(false)} />}
        </div>
    );
});

export default EntryEmployee;