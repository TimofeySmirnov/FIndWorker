import React, {useState} from 'react';
import CustomInput from "../../components/UI/CustomInput/customInput.jsx";
import CustomRedButton from "../../components/UI/customRedButton/CustomRedButton.jsx";
import {changeEmail} from "../../API/applicantAPI.js";
import ErrorModal from "../modalForErrors/errorModal.jsx";
import classes from "./updateImportant.module.css";
import {changeEmployerEmail} from "../../API/employeeAPI.js";

const UpdateEmail = ({onCloseModal, whoChange}) => {
    const [newEmail, setNewEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [modal, setModal] = useState(false);
    const changeUserEmail = async (e) => {
        e.preventDefault();
        if(whoChange === 'APPLICANT') {
            try{
                const data = await changeEmail(newEmail, password);
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
                const data = await changeEmployerEmail(newEmail, password);
                console.log(data)
                onCloseModal()
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
                        <h2>Смена email</h2>
                        <CustomInput type='email' placeholder='Введите новый email' value={newEmail} onChange={(e) => setNewEmail(e.target.value)}/>
                        <CustomInput type='password' placeholder='Введите пароль' value={password} onChange={(e) => setPassword(e.target.value)}/>
                        <CustomRedButton onClick={(event) => changeUserEmail(event)}>Сменить почту</CustomRedButton>
                    </form>
                    {modal && <ErrorModal message={error} onClose={() => setModal(false)}/>}
                </div>
            </div>
        </div>
    );
};

export default UpdateEmail;