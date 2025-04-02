import React, {useContext, useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {deleteResume, getResumesById} from "../API/resumesAPI.js";
import {Context} from "../main.jsx";
import dayjs from "dayjs";
import {observer} from "mobx-react-lite";
import CustomRedButton from "../components/UI/customRedButton/CustomRedButton.jsx";
import {HOME_ROUTE} from "../utils/consts.js";
import Resume from "../Modal/resume/resume.jsx";
import ErrorModal from "../Modal/modalForErrors/errorModal.jsx";
import classes from '../styles/resumePage.module.css'

const ResumePage = observer(() => {
    const {id} = useParams();
    const {user, resumes} = useContext(Context)
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [modal, setModal] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    useEffect(() => {
        getResumesById(id).then(data => {resumes.setResumeById(data)}); window.scrollTo(0, 0);
    }, [id, isUpdate, isDelete]);
    const resumeById = resumes.resumeById
    const dateCreated = dayjs(Date(resumeById.createdAt)).format('DD-MM-YYYY');
    const dateUpdated = dayjs(Date(resumeById.updatedAt)).format('DD-MM-YYYY');
    const deleteThisResume= async (id) => {
        try{
            const {data} = await deleteResume(id)
            console.log(data)
            setIsDelete(true)
            navigate(HOME_ROUTE)
            setError("Резюме удалено");
            setModal(true);
        }catch(error){
            setError(error.response.data.message|| error.response.data.error || 'Что то пошло не так');
            setModal(true);
        }
    }
    return (
        <div className={classes.container}>
            <div className={classes.dataContainer}>
                <h2>Резюме</h2>
                <p>На специальность: {resumeById?.position?.name}</p>
                <p>Создано: {dateCreated}</p>
                <p>Последнее обновление: {dateUpdated}</p>
                <div>
                    <h3>Основная информация</h3>
                    <p>Образование: {resumeById.education}</p>
                    <p>Опыт: {resumeById.experience}</p>
                    <p>Город: {resumeById.city}</p>
                    <p>Ссылки: {resumeById.links}</p>
                </div>
            </div>
            {
                user.role === 'USER' && user.user === resumeById.idApplicant ?
                    (<div className={classes.buttonContainer}>
                    <CustomRedButton onClick = {() => {setIsUpdate(true)}}>Редактировать это резюме</CustomRedButton>
                    <CustomRedButton onClick = {() => {deleteThisResume(resumeById.id)}}>Удалить это резюме</CustomRedButton>
                    </div>) : null
            }

            {isUpdate && <Resume oldResume={resumeById} onCloseModal={() => {setIsUpdate(false)}}/>}
            {modal && <ErrorModal message={error} onClose={() => setModal(false)}/>}
        </div>
    );
});

export default ResumePage;