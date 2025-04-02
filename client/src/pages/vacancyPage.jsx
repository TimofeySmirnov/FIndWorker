import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../main.jsx";
import {getById} from "../API/vacanciesAPI.js";
import {observer} from "mobx-react-lite";
import {useNavigate, useParams} from "react-router-dom";
import classes from '../styles/vacancyPage.module.css'
import CustomRedButton from "../components/UI/customRedButton/CustomRedButton.jsx";
import {getEmployeeById} from "../API/employeeAPI.js";
import {recallToVacancy} from "../API/recallsAPI.js";
import {getMyResumes} from "../API/resumesAPI.js";
import ChangeResume from "../Modal/recall/changeResume.jsx";
import {RECALL_ROUTE, VIEW_EMPLOYER_PROFILE_ROUTE} from "../utils/consts.js";
import ErrorModal from "../Modal/modalForErrors/errorModal.jsx";

const VacancyPage = observer(() => {
    const navigate = useNavigate();
    const {user, vacancy, employees, resumes} = useContext(Context);
    const [trigger, setTrigger] = useState(false);
    const {id} = useParams()
    const [modalResumes, setModalResumes] = useState(false);
    const [error, setError] = useState('');
    const [modal, setModal] = useState(false);
    useEffect(() => {
        getById(id).then(result => vacancy.setVacancyById(result));
    }, [id]);
    useEffect(() => {
        getMyResumes().then((data) => {resumes.setMyResumes(data)});
    }, [trigger]);
    const findVacancy = vacancy.vacancyById
    const idEmployee = findVacancy?.idEmployee;
    useEffect(() => {
        getEmployeeById(idEmployee).then(result => employees.setEmployeeById(result));
        window.scrollTo(0, 0);
    }, [idEmployee])
    const findEmployee = employees.employeeById
    const symbolCurrency = findVacancy?.currency?.symbol
    const checkCanRecall = (user, findVacancy) => {
        if(user.role === 'USER') {
            if(findVacancy.status !== 'ACTIVE') {
                return (
                    <CustomRedButton disabled onClick={clickToRecall} >Откликнуться</CustomRedButton>
                )
            }
            return (
                <CustomRedButton onClick={clickToRecall} >Откликнуться</CustomRedButton>
            )
        }
        return null
    }
    const paymentInfo = (() => {
        if (findVacancy?.minimumPayment && findVacancy?.maximumPayment) {
            return `От ${findVacancy.minimumPayment} ${symbolCurrency} до ${findVacancy.maximumPayment} ${symbolCurrency}`;
        }
        if (findVacancy?.minimumPayment) {
            return `От ${findVacancy.minimumPayment} ${symbolCurrency}`;
        }
        if (findVacancy?.maximumPayment) {
            return `До ${findVacancy.maximumPayment} ${symbolCurrency}`;
        }
        return "Зарплата не указана";
    })();

    const clickToRecall = async () => {
        if(findVacancy.needResume){
            setTrigger(prev => !prev)
            setModalResumes(true);
        }
        else {
            try{
                await recallToVacancy(findVacancy.id);
                setError("Вы успешно откликнулись на вакансию");
                setModal(true);
            }catch (error) {
                setError(error.response.data.message|| error.response.data.error || 'Что то пошло не так');
                setModal(true);
            }
        }
    }

    const goToProfile = () => {
        navigate(VIEW_EMPLOYER_PROFILE_ROUTE.replace(':id', findVacancy.idEmployee));
    }

    const clickToViewRecalledApplicants = () => {
        navigate(RECALL_ROUTE.replace(':id', id))
    }

    return (
        <div className={classes.vacancyPage}>
            <div className={classes.vacancyField}>
                <h1>{findVacancy?.name}</h1>
                <div className={classes.vacancyParams}>
                    {!findVacancy?.needResume && <p className={classes.needsResume}>Отклик без резюме</p>}

                    {findVacancy?.busyness?.nameBusyness && (
                        <p className={classes.otherParams}>{findVacancy.busyness.nameBusyness}</p>
                    )}

                    {findVacancy?.work_experience?.name && (
                        <p className={classes.otherParams}>Опыт {findVacancy.work_experience.name}</p>
                    )}

                    {findVacancy?.work_format?.name && (
                        <p className={classes.otherParams}>{findVacancy.work_format.name}</p>
                    )}
                    {findVacancy?.workSchedule && (
                        <p className={classes.otherParams}>График {findVacancy?.workSchedule}</p>
                    )}
                    {findVacancy?.officeHours && (
                        <p className={classes.otherParams}>{findVacancy?.officeHours} часов</p>
                    )}
                </div>
                <p>{findVacancy?.description}</p>
                <p>{paymentInfo}</p>
                <p><strong>Адрес:</strong> {findVacancy?.Address}</p>
                {
                    checkCanRecall(user, findVacancy)
                }
                {
                    user.role === 'EMPLOYEE' && user.user === findVacancy.idEmployee ? <CustomRedButton onClick={clickToViewRecalledApplicants}>Посмотреть откликнувшихся</CustomRedButton> : null
                }
            </div>
            <div className={classes.employeeField}>
                {findEmployee?.img && <img height={200} width={200} style={{borderRadius: '50%'}} src={`http://localhost:5000/` + findEmployee?.img} alt={findEmployee.name || "Фото"} />}
                {findEmployee?.name && <h2>{findEmployee.name}</h2>}
                {findEmployee.description && <p>{findEmployee.description}</p>}
                <CustomRedButton onClick={goToProfile}>Перейти в профиль работодателя</CustomRedButton>
            </div>
            {modalResumes && (<ChangeResume resumes={resumes.myResumes} onClose={() => setModalResumes(false)} idVacancy={findVacancy.id}/>)}
            {modal && <ErrorModal message={error} onClose={() => setModal(false)}/>}
        </div>
    );
});

export default VacancyPage;