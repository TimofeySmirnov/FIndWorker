import React, {useContext, useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import {Context} from "../main.jsx";
import {getEmployeeById} from "../API/employeeAPI.js";
import {jwtDecode} from "jwt-decode";
import {HOME_ROUTE, MY_VACANCIES_ROUTE, VACANCIES_ROUTE} from "../utils/consts.js";
import {observer} from "mobx-react-lite";
import dayjs from "dayjs";
import CustomRedButton from "../components/UI/customRedButton/CustomRedButton.jsx";
import {deleteFeedback, getByIdEmployer, updateFeedback} from "../API/feedbacksAPI.js";
import FeedbackCard from "../components/Feedback/feedbackCard.jsx";
import classes from '../styles/employeeProfile.module.css'
import {$authHost} from "../API/index.js";
import FeedbackModal from "../Modal/feedback/feedbackModal.jsx";
import UpdateEmployeeProfile from "../Modal/employee/updateEmployeeProfile.jsx";
import UpdateEmail from "../Modal/updateImportantData/updateEmail.jsx";
import UpdatePassword from "../Modal/updateImportantData/updatePassword.jsx";

const EmployerProfilePage = observer(() => {
    const {id} = useParams();
    const {employees, feedbacks, user} = useContext(Context);
    const [trigger, setTrigger] = useState(0);
    const [avg, setAvg] = useState(0);
    const [redacted, setRedacted] = useState(false);
    const [updateProfile, setUpdateProfile] = useState(false);
    const [updateEmail, setUpdateEmail] = useState(false);
    const [updatePassword, setUpdatePassword] = useState(false);
    const [decodedToken, setDecodedToken] = useState({ role: '' });
    const checkToken = () => {
        const encodeToken = localStorage.getItem('token');
        let token = { role: '' };

        if (encodeToken) {
            try {
                console.log('Нашел токен');
                token = jwtDecode(encodeToken);
            } catch (error) {
                console.error('Ошибка декодирования токена:', error);
            }
        }
        setDecodedToken(token); // Обновляем состояние
        return token;
    };


    useEffect(() => {getEmployeeById(Number(id)).then(data => {employees.setEmployeeById(data)});
        getByIdEmployer(Number(id)).then(data => {feedbacks.setFeedbacksByEmployer(data.feedbacks);
            const currentToken = checkToken();  setAvg(data.avgRating)}).catch(() => feedbacks.clearFeedbacksByEmployer())}, [id, trigger])
    const employeeData = employees?.employeeById

    const dateCreate = dayjs((employeeData.createdAt)).format('DD-MM-YYYY');

    const deleteThisFeedback = async (id) => {
        try{
            const data = await deleteFeedback(id)
            console.log(data)
            setTrigger(prev => prev + 1);
        }catch(error){
            console.log(error)
        }
    }

    return (
        <div className={classes.page}>
            <div className={classes.logoAdnDataContainer}>
                <img height={200} width={200} style={{borderRadius: '50%'}}
                     src={`http://localhost:5000/` + employeeData.img} alt={employeeData.name || "Фото"} />
                <div>
                    <p>Адрес: {employeeData.address}</p>
                    <p>Телефон: {employeeData.phoneNumber}</p>
                    <p>Email: {employeeData.email}</p>
                </div>
                {decodedToken.role === 'EMPLOYEE' && Number(id) === decodedToken.id ? <Link to={MY_VACANCIES_ROUTE}>Просмотреть мои вакансии</Link> :
                    <Link to={VACANCIES_ROUTE + `?idEmployee=${employeeData.id}`}>Посмотреть вакансии работодателя</Link>}
            </div>
            <div className={classes.mainDataContainer}>
                <div>
                    <div className={classes.titleAndRate}>
                        <div className={classes.title}>
                            <h2>{employeeData.name}</h2>
                            <p className={classes.star}>★ {avg}</p>
                        </div>
                        {decodedToken.role === 'EMPLOYEE' && Number(id) === decodedToken.id ?
                            (<div className={classes.buttonContainer}>
                                <CustomRedButton onClick={() => {setUpdateProfile(true)}}>Редактировать профиль</CustomRedButton>
                                <CustomRedButton onClick={() => {setUpdateEmail(true)}}>Сменить email</CustomRedButton>
                                <CustomRedButton onClick={() => {setUpdatePassword(true)}}>Сменить пароль</CustomRedButton>
                            </div>) : null}

                    </div>

                    <p>На FindWorker с {dateCreate}</p>
                </div>
                <div>
                <p>Описание: {employeeData.description}</p>
                </div>
                <div className={classes.feedbackContainer}>
                    <h3>Отзывы этой компании</h3>
                    {user.role === 'USER' && (<CustomRedButton onClick={() => setRedacted(true)}>Оставить отзыв</CustomRedButton>)}

                    {feedbacks.feedbacksByEmployer.length > 0 ? (
                        feedbacks.feedbacksByEmployer.map((feedback) => (
                            <FeedbackCard key={feedback.id} feedback={feedback} trigger={setTrigger} token={decodedToken} deleteFeedback={deleteThisFeedback} />
                        ))
                    ) : (
                        <p>Отзывов пока нет</p>
                    )}
                </div>

            </div>
            {updateProfile && (<UpdateEmployeeProfile oldData={employeeData} onClose={() => setUpdateProfile(false)} trigger={setTrigger}/>)}
            { redacted && <FeedbackModal onClose={() => {setRedacted(false)}} idEmployer={employeeData.id} trigger={setTrigger}/> }
            {updateEmail && (<UpdateEmail whoChange='EMPLOYER' onCloseModal={() => setUpdateEmail(false) }/>)}
            {updatePassword && (<UpdatePassword whoChange='EMPLOYER' onCloseModal={() => setUpdatePassword(false) }/>)}
        </div>
    );
});



export default EmployerProfilePage;