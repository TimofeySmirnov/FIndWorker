import React, {useState} from 'react';
import CustomInput from "../../components/UI/CustomInput/customInput.jsx";
import CustomTextarea from "../../components/UI/customTextarea/customTextarea.jsx";
import CustomRedButton from "../../components/UI/customRedButton/CustomRedButton.jsx";
import {createVacancy, updateVacancy} from "../../API/vacanciesAPI.js";
import {createFeedback} from "../../API/feedbacksAPI.js";
import ErrorModal from "../modalForErrors/errorModal.jsx";
import classes from './modalVacancy/vacancy.module.css'

const CreateUpdateVacancy = ({oldData, onCLose, trigger, busyness, currencies, workExperiences, workFormats, positions, idEmployer}) => {
    const [name, setName] = useState(oldData?.name || '');
    const [description, setDescription] = useState(oldData?.description || '');
    const [officeHour, setOfficeHour] = useState(oldData?.officeHours || 0);
    const [workSchedule, setWorkSchedule] = useState(oldData?.workSchedule || '');
    const [address, setAddress] = useState(oldData?.Address || '');
    const [minimumPayment, setMinimumPayment] = useState(oldData?.minimumPayment || '');
    const [maximumPayment, setMaximumPayment] = useState(oldData?.minimumPayment || '');
    const [needResume, setNeedResume] = useState(oldData?.needResume || false);
    const [idBusyness, setIdBusyness] = useState(oldData?.idBusyness || null)
    const [idCurrency, setIdCurrency] = useState(oldData?.idCurrency || null)
    const [idWorkExperience, setIdWorkExperience] = useState(oldData?.idWorkExperience || null)
    const [idWorkFormat, setIdWorkFormat] = useState(oldData?.idWorkFormat || null)
    const [idPosition, setIdPosition] = useState(oldData?.idPosition || null)
    const [error, setError] = useState("");
    const [modal, setModal] = useState(false);
    const submit = async (event) => {
        event.preventDefault();
        try{
            if(oldData){
                const {data} = await updateVacancy(oldData.id,
                    {name, description, officeHour, workSchedule,
                        address, minPay : minimumPayment, maxPay : maximumPayment, needResume,
                        idBusyness, idCurrency, idWorkExperience, idWorkFormat, idPosition});
                console.log(data)
                trigger()
                onCLose();
            }
            else {
                const {data} = await createVacancy(
                    {name, description, officeHour, workSchedule,
                        address, minPay : minimumPayment, maxPay : maximumPayment, needResume,
                        idBusyness, idCurrency, idWorkExperience, idWorkFormat, idPosition});
                console.log(data)
                trigger()
                onCLose();
            }
        }catch(error){
            setError(error.response.data.error || error.response.data.message || 'Что то пошло не так');
            setModal(true);
        }
    }

    return (
        <div className={classes.modalOverlay}>
            <div className={classes.container}>
                <button onClick={() => onCLose()} className={classes.closeBtn}>X</button>
                <form className={classes.form}>
                    <div className={classes.inputBox}>
                        <CustomInput type='text' value={name} onChange={(e) => setName(e.target.value)}
                                     placeholder='Введите заголовок вакансии'/>
                        <CustomTextarea value={description} onChange={(e) => setDescription(e.target.value)}
                                        placeholder='Введите описание вакансии'/>
                        <CustomInput type="number" min="0" max="16" step="0.5" value={officeHour}
                                     onChange={(e) => setOfficeHour(e.target.value)}
                                     placeholder='Введите количество рабочих часов'/>
                        <CustomInput type='text' value={workSchedule} onChange={(e) => setWorkSchedule(e.target.value)}
                                     placeholder='Введите график работы'/>
                        <CustomInput type='text' value={address} onChange={(e) => setAddress(e.target.value)}
                                     placeholder='Введите адрес локации'/>
                        <CustomInput type='number' value={minimumPayment}
                                     onChange={(e) => setMinimumPayment(e.target.value)}
                                     placeholder='Введите минимальную оплату'/>
                        <CustomInput type='number' value={maximumPayment}
                                     onChange={(e) => setMaximumPayment(e.target.value)}
                                     placeholder='Введите максимальную оплату'/>
                        <div className={classes.needResume}>
                            <p>Нужно ли резюме для отклика </p>
                            <CustomInput type='checkbox' checked={needResume}
                                         onChange={(e) => setNeedResume(e.target.value)}
                                         placeholder='Нужно ли резюме для отклика'/>
                        </div>

                    </div>
                    <div className={classes.selectBox}>
                        <div>
                            <p>Занятость:</p>
                            <select value={idBusyness} onChange={e => setIdBusyness(e.target.value)}>
                                <option value="">Выберите занятость</option>
                                {busyness.map((busy) => (
                                    <option key={busy.id} value={busy.id}>
                                        {busy.nameBusyness}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <p>Валюта:</p>
                            <select value={idCurrency} onChange={e => setIdCurrency(e.target.value)}>
                                <option value="">Выберите валюту</option>
                                {currencies.map((currency) => (
                                    <option key={currency.id} value={currency.id}>
                                        {currency.symbol}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <p>Опыт работы:</p>
                            <select value={idWorkExperience} onChange={e => setIdWorkExperience(e.target.value)}>
                                <option value="">Выберите опыт работы</option>
                                {workExperiences.map((exp) => (
                                    <option key={exp.id} value={exp.id}>
                                        {exp.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <p>формат работы:</p>
                            <select value={idWorkFormat} onChange={e => setIdWorkFormat(e.target.value)}>
                                <option value="">формат работы</option>
                                {workFormats.map((format) => (
                                    <option key={format.id} value={format.id}>
                                        {format.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <p>Должность:</p>
                            <select value={idPosition} onChange={e => setIdPosition(e.target.value)}>
                                <option value="">Выберите должность</option>
                                {positions.map((position) => (
                                    <option key={position.id} value={position.id}>
                                        {position.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <CustomRedButton onClick={(event) => {
                        submit(event)
                    }}>Сохранить</CustomRedButton>
                </form>
                {modal && <ErrorModal message={error} onClose={() => setModal(false)}/>}
            </div>
        </div>
    );
};

export default CreateUpdateVacancy;