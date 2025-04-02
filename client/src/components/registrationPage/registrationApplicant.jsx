import React, {useContext, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../main.jsx";
import CustomInput from "../UI/CustomInput/customInput.jsx";
import CustomRedButton from "../UI/customRedButton/CustomRedButton.jsx";
import ErrorModal from "../../Modal/modalForErrors/errorModal.jsx";
import {registrationApplicant} from "../../API/applicantAPI.js";
import {Link, useNavigate} from "react-router-dom";
import {HOME_ROUTE, LOGIN_ROUTE} from "../../utils/consts.js";
import classes from "./registration.module.css";
import BackToLogin from "./backToLogin.jsx";

const RegistrationApplicant = observer(() => {
    const {user} = useContext(Context)
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [middleName, setMiddleName] = useState("")
    const [phoneNumber, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [modal, setModal] = useState(false)
    const [error, setError] = useState("")

    const registration = async (e) => {
        e.preventDefault()
        let data;
        if(password !== confirmPassword) {
            setModal(true)
            return
        }
        try{
            data = await registrationApplicant({firstName, lastName, middleName, phoneNumber, email, password})
            user.setUser(data.id);
            user.setRole(data.role);
            user.setIsAuth(true)
            navigate(HOME_ROUTE)
        }catch(error){
            console.log(error, 'catch')
            if(error.response.data.errors){
                setError(error.response.data.errors.join(', '))
            }
            else{
                setError(error.response.data.message)
            }

            setModal(true)
        }
    }
    return (
        <div >
            <div className={classes.entryForm}>
                <h2>Регистрация соискателя</h2>
                <form className={classes.loginForm}>
                    <CustomInput type='text' placeholder="Введите имя" value={firstName}
                                 onChange={(e) => setFirstName(e.target.value)}/>
                    <CustomInput type='text' placeholder="Введите фамилию" value={lastName}
                                 onChange={(e) => setLastName(e.target.value)}/>
                    <CustomInput type='text' placeholder="Введите отчество" value={middleName}
                                 onChange={(e) => setMiddleName(e.target.value)}/>
                    <CustomInput type='tel' placeholder="Введите номер телефона" value={phoneNumber}
                                 onChange={(e) => setPhone(e.target.value)}/>
                    <CustomInput type='email' placeholder="Введите email" value={email}
                                 onChange={(e) => setEmail(e.target.value)}/>
                    <CustomInput type='password' placeholder="Введите пароль" value={password}
                                 onChange={(e) => setPassword(e.target.value)}/>
                    <CustomInput type='password' placeholder="Подтвердите пароль" value={confirmPassword}
                                 onChange={(e) => setConfirmPassword(e.target.value)}/>
                    <CustomRedButton onClick={(e) => registration(e)}>Регистрация</CustomRedButton>
                </form>
                <p>Нажимая войти вы подтверждаете, что полностью принимаете условия
                    <Link
                        to={'https://hh.ru/account/agreement?backurl=%2Faccount%2Fsignup%3Fbackurl%3D%252F&hhtmFrom=account_login'}> соглашения </Link>
                    и ознакомились с
                    <Link to={'https://hh.ru/article/personal_data?backurl=%2F&hhtmFrom=account_login'}> политикой
                        конфиденциальности</Link></p>

            </div>

            <BackToLogin/>
            {modal && <ErrorModal message={error} onClose={() => setModal(false)}/>}
        </div>
    );
});

export default RegistrationApplicant;