import React, {useContext, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Link, useNavigate} from "react-router-dom";
import {Context} from "../../main.jsx";
import {loginApplicant} from "../../API/applicantAPI.js";
import {ADMIN_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE} from "../../utils/consts.js";
import classes from "./entryPagesStyles.module.css";
import LoginForm from "./loginForm.jsx";
import CustomRedButton from "../UI/customRedButton/CustomRedButton.jsx";
import ErrorModal from "../../Modal/modalForErrors/errorModal.jsx";
import {loginAdmin} from "../../API/adminAPI.js";

const EntryToAdmin = observer(() => {
    const navigate = useNavigate();
    const {user} = useContext(Context)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [secret, setSecret] = useState("");
    const [error, setError] = useState("");
    const [modalOpen, setModalOpen] = useState(false);

    const onChangeEmail = (email) => {
        setEmail(email);
    }
    const onChangePassword = (email) => {
        setPassword(email);
    }
    const onChangeSecretKey = (secretKey) => {
        setSecret(secretKey);
    }
    let data
    const onSubmit = async (e) =>{
        e.preventDefault();
        try{
            data = await loginAdmin(email, password, secret)
            user.setUser(data.id);
            user.setRole(data.role);
            user.setIsAuth(true)
            navigate(ADMIN_ROUTE)
        }
        catch(error){
            setModalOpen(true);
            console.log(error);
            setError(error.response.data.message || error.response.data.error);
        }
    }

    const redirectToEmployee = () => {
        user.setEntry('EMPLOYEE')
        navigate(LOGIN_ROUTE);

    }
    const redirectToApplicant = () => {
        user.setEntry('APPLICANT')
        navigate(LOGIN_ROUTE);

    }
    return (
        <div>
            <div className={classes.entryForm}>
                <h2>Администрирование сайта</h2>
                <LoginForm onchangeEmail={onChangeEmail} onChangePassword={onChangePassword} onSubmit={onSubmit}
                           onChangeSecretKey={onChangeSecretKey}/>
                <p><Link to={REGISTRATION_ROUTE}>Регистрация</Link></p>
            </div>
            <div className={classes.anotherLoginForm}>
                <CustomRedButton onClick={redirectToEmployee}>Я ищу сотрудников</CustomRedButton>
                <CustomRedButton onClick={redirectToApplicant}>Я ищу работу</CustomRedButton>
            </div>
            {modalOpen && <ErrorModal message={error} onClose={() => setModalOpen(false)} />}
        </div>
    );
});

export default EntryToAdmin;