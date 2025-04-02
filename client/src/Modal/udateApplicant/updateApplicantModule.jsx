import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import classes from './updateApplicant.module.css'
import CustomInput from "../../components/UI/CustomInput/customInput.jsx";
import CustomRedButton from "../../components/UI/customRedButton/CustomRedButton.jsx";
import {updateApplicant} from "../../API/applicantAPI.js";
import ErrorModal from "../modalForErrors/errorModal.jsx";

const UpdateApplicantModule = (({closeModal, applicant}) => {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [middleName, setMiddleName] = useState("")
    const [phoneNumber, setPhone] = useState("")
    const [modal, setModal] = useState(false)
    const [error, setError] = useState("")
    const loadOldData = async () => {
        setFirstName(applicant.firstName)
        setLastName(applicant.lastName)
        setMiddleName(applicant.middleName)
        setPhone(applicant.phoneNumber)
    }

    useEffect(() => {
        loadOldData()
    }, [applicant]);

    const update = async (event) => {
        event.preventDefault()
        try{
            const data = await updateApplicant({firstName, lastName, middleName, phoneNumber})
            console.log(data)
            closeModal()
        }catch(error){
            setError(error.response.data.message)
            setModal(true)
        }

    }
    return (
        <div className={classes.modalOverlay}>
            <div className={classes.container}>
                <button onClick={() => closeModal()} className={classes.closeBtn}>X</button>
                <form className={classes.form}>
                    <h2>Редактирование основных данных</h2>
                    <CustomInput type='text' value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                    <CustomInput type='text' value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                    <CustomInput type='text' value={middleName} onChange={(e) => setMiddleName(e.target.value)}/>
                    <CustomInput type='tel' value={phoneNumber} onChange={(e) => setPhone(e.target.value)}/>
                    <CustomRedButton onClick={(event) => update(event)}>Обновить данные</CustomRedButton>
                </form>
                {modal && <ErrorModal message={error} onClose={() => setModal(false)}/>}
            </div>
        </div>
    );
});

export default UpdateApplicantModule;