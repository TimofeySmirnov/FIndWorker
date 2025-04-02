import React, {useState} from 'react';
import {changeEmail, changePassword} from "../../API/applicantAPI.js";
import {changeEmployerEmail, changeEmployerPassword} from "../../API/employeeAPI.js";
import classes from "./updateImportant.module.css";
import CustomInput from "../../components/UI/CustomInput/customInput.jsx";
import CustomRedButton from "../../components/UI/customRedButton/CustomRedButton.jsx";
import ErrorModal from "../modalForErrors/errorModal.jsx";

const UpdatePassword = ({onCloseModal, whoChange}) => {
    const [newPassword, setNewPassword] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [modal, setModal] = useState(false);
    const changeUserEmail = async (e) => {
        e.preventDefault();
        if(whoChange === 'APPLICANT') {
            try{
                const data = await changePassword(password, newPassword);
                console.log(data)
                onCloseModal()
            }catch(error){
                setError(error.response.data.message);
                console.log(error.response);
                setModal(true);
            }
        }
        if(whoChange === 'EMPLOYER') {
            try{
                const data = await changeEmployerPassword( password, newPassword);
                console.log(data)
                onClose()
            }
            catch(error){
                setError(error.response.data.message);
                console.log(error.response.data.message);
                setModal(true);
            }
        }
    }
    return (
        <div className={classes.modalOverlay}>
            <div className={classes.container}>
                <button onClick={() => onCloseModal()} className={classes.closeBtn}>X</button>
                <div>
                    <form className={classes.form}>
                        <h2>Смена пароля</h2>
                        <CustomInput type='password' placeholder='Введите новый пароль' value={newPassword} onChange={(e) => setNewPassword(e.target.value)}/>
                        <CustomInput type='password' placeholder='Введите старый пароль' value={password} onChange={(e) => setPassword(e.target.value)}/>
                        <CustomRedButton onClick={(event) => changeUserEmail(event)}>Сменить пароль</CustomRedButton>
                    </form>
                    {modal && <ErrorModal message={error} onClose={() => setModal(false)}/>}
                </div>
            </div>
        </div>
    );
};

export default UpdatePassword;