import React, {useContext, useEffect, useState} from 'react';
import {data, Link, useNavigate, useParams} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {getById, getMe} from "../API/applicantAPI.js";
import {jwtDecode} from "jwt-decode";
import {HOME_ROUTE, RESUME_ROUTE, RESUMES_ROUTE} from "../utils/consts.js";
import {Context} from "../main.jsx";
import CustomRedButton from "../components/UI/customRedButton/CustomRedButton.jsx";
import dayjs from "dayjs";
import classes from '../styles/applicantProfile.module.css'

import RecallToVacancyCard from "../components/applicantProfile/recallToVacancyCard.jsx";

import UpdateApplicantModule from "../Modal/udateApplicant/updateApplicantModule.jsx";
import UpdateEmail from "../Modal/updateImportantData/updateEmail.jsx";
import UpdatePassword from "../Modal/updateImportantData/updatePassword.jsx";

const ApplicantProfile = observer(() => {
    const navigate = useNavigate();
    const {applicant, recalls, resumes, user} = useContext(Context);
    const {id} = useParams();
    const [updateMainData, setUpdateMainData] = useState(false);
    const [updateEmail, setUpdateEmail] = useState(false);
    const [updatePassword, setUpdatePassword] = useState(false);

    const closeUpdateMainData = () => {
        setUpdateMainData(false);
    }

    const checkIdApplicant = async () =>{
        const token = jwtDecode(localStorage.getItem("token"));
        if(!token){
            navigate(HOME_ROUTE);
            return
        }
        if(token.id === Number(id) && token.role === 'USER'){
            getMe().then((data) => {applicant.setApplicantProfile(data)});

        }
        else if(token.role !== 'USER'){
            getById(id).then((data) => {applicant.setApplicantProfile(data)});
        }
    }


    useEffect(() => { checkIdApplicant(); window.scrollTo(0, 0);
    },  [id, updateMainData]);
    const dataApplicant = applicant.ApplicantProfile


    const dateRegistration = dayjs(dataApplicant.createdAt).format('DD-MM-YYYY');
    return (

        <div>
            <div className={classes.ApplicantProfile}>
                <div className={classes.mainData}>
                    <h2>{dataApplicant?.lastName} {dataApplicant?.firstName} {dataApplicant?.middleName}</h2>
                    <p>Соискатель. На сайте с {dateRegistration}</p>
                    <Link to={RESUMES_ROUTE}>Посмотреть резюме</Link>
                </div>
                <div className={classes.updateContainer}>
                    {
                        user.role === 'USER' &&
                        <>
                            <CustomRedButton onClick={() => setUpdateMainData(true)}>Редактировать профиль</CustomRedButton>
                            <CustomRedButton onClick={() => setUpdateEmail(true)}>Редактировать email</CustomRedButton>
                            <CustomRedButton onClick={() => setUpdatePassword(true)}>Сменить пароль</CustomRedButton>
                        </>
                    }
                </div>
                <div className={classes.recallsTitle}>
                    <h3>Список откликов на вакансии:</h3>
                </div>
                <div className={classes.recallsContainer}>
                    <div className={classes.recallsTitles}>
                        <p>Название вакансии</p>
                        <p>Организация</p>
                        <p>Cтатус</p>
                    </div>
                    <div className={classes.recallsContent}>
                        {dataApplicant?.vacancies?.length > 0 ? (
                            dataApplicant?.vacancies?.map((recall) => (
                                <RecallToVacancyCard key={recall.id} recall={recall}/>
                            ))
                        ) : (
                            <p>Отклики не найдены</p>
                        )}
                    </div>
                </div>

            </div>
            {updateMainData && ( <UpdateApplicantModule closeModal={closeUpdateMainData} applicant={dataApplicant}/>)}
            {updateEmail && (<UpdateEmail whoChange='APPLICANT' onCloseModal={() => setUpdateEmail(false) }/>)}
            {updatePassword && (<UpdatePassword whoChange='APPLICANT' onCloseModal={() => setUpdatePassword(false) }/>)}
        </div>
    );
});

export default ApplicantProfile;