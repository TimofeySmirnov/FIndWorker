import React, {useContext, useState} from 'react';
import {observer} from "mobx-react-lite";
import classes from "./registration.module.css";
import CustomInput from "../UI/CustomInput/customInput.jsx";
import CustomRedButton from "../UI/customRedButton/CustomRedButton.jsx";
import {Link, useNavigate} from "react-router-dom";
import ErrorModal from "../../Modal/modalForErrors/errorModal.jsx";
import {Context} from "../../main.jsx";
import {HOME_ROUTE, LOGIN_ROUTE} from "../../utils/consts.js";
import {registrationEmployee} from "../../API/employeeAPI.js";
import BackToLogin from "./backToLogin.jsx";

const RegistrationEmployee = observer(() => {
    const {user} = useContext(Context)
    const navigate = useNavigate();
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [address, setAddress] = useState("")
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
            setError("Пароли не совпадают")
            setModal(true)
            return
        }
        try{
            data = await registrationEmployee({name, description, address, phoneNumber, email, password})
            user.setUser(data.id);
            user.setRole(data.role);
            user.setIsAuth(true)
            navigate(HOME_ROUTE)
        }catch(error){
            console.log('catch' ,error);
            setError(error.response.data.message || error.response.data.error)
            setModal(true)
        }
    }

    return (
        <div>
            <div className={classes.entryForm}>
                <h2>Регистрация организации</h2>
                <form className={classes.loginForm}>
                    <CustomInput placeholder="Введите наименовании организации" value={name}
                                 onChange={(e) => setName(e.target.value)}/>
                    <CustomInput placeholder="Введите описание организации" value={description}
                                 onChange={(e) => setDescription(e.target.value)}/>
                    <CustomInput placeholder="Введите адресс организации" value={address}
                                 onChange={(e) => setAddress(e.target.value)}/>
                    <CustomInput placeholder="Введите номер телефона" value={phoneNumber}
                                 onChange={(e) => setPhone(e.target.value)}/>
                    <CustomInput placeholder="Введите email" value={email}
                                 onChange={(e) => setEmail(e.target.value)}/>
                    <CustomInput placeholder="Введите пароль" value={password}
                                 onChange={(e) => setPassword(e.target.value)}/>
                    <CustomInput placeholder="Подтвердите пароль" value={confirmPassword}
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

export default RegistrationEmployee;