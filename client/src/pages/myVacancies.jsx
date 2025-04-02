import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../main.jsx";
import {changeStatus, deleteVacancy, getMyVacancies} from "../API/vacanciesAPI.js";
import CustomRedButton from "../components/UI/customRedButton/CustomRedButton.jsx";
import EmployerVacancyCard from "../components/vacanciesPage/employerVacncyPage/employerVacancyCard.jsx";
import classes from '../styles/myVacancies.module.css'
import ErrorModal from "../Modal/modalForErrors/errorModal.jsx";
import CreateUpdateVacancy from "../Modal/vacancy/createUpdateVacancy.jsx";
import {getALlPosition} from "../API/positionAPI.js";
import {getAllEmployees} from "../API/employeeAPI.js";
import {getAllBusyness, getAllCurrencies, getAllWorkExperiences, getAllWorkFormats} from "../API/filtersAPI.js";


const MyVacancies = observer(() => {
    const {vacancy, filters, positions, user} = useContext(Context);
    const [error, setError] = useState("");
    const [modal, setModal] = useState(false);
    const [trigger, setTrigger] = useState(0);
    const [createVacancyModal, setCreateVacancyModal] = useState(false);
    const [dataFromUpdate, setDataFromUpdate] = useState(undefined);
    useEffect(() => {
        getMyVacancies().then((result) => {vacancy.setMyVacancies(result)});
    }, [trigger]);
    useEffect(() => {
        getALlPosition().then(data => {positions.setAllPositions(data)});
        getAllBusyness().then(data => {filters.setBusyness(data.getData);
        });
        getAllCurrencies().then(data => {filters.setCurrencies(data.getData)});
        getAllWorkExperiences().then(data => {filters.setWorkExperiences(data.getData)});
        getAllWorkFormats().then(data => {filters.setWorkFormats(data.getData)});
    }, []);

    const changeStatusVacancy = async(id) => {
        try{
            const {data} = await changeStatus(id)
            setError("Статус вакансии успешно изменен");
            setModal(true);
            setTrigger(prev => prev + 1)
        }catch(error){
            setError(error.response.data.error || error.response.data.message || 'Что то пошло не так');
            setModal(true);
        }

    }

    const deleteThisVacancy = async(id) => {
        try{
            const {data} = await deleteVacancy(id)
            setError("Вакансия успешно удалена");
            setModal(true);
            setTrigger(prev => prev + 1)
        }catch(error){
            setError(error.response.data.error || error.response.data.message || 'Что то пошло не так');
            setModal(true);
        }
    }

    const createVacancy = () => {
        setDataFromUpdate(undefined);
        setCreateVacancyModal(true);
    }
    const updateVacancy = (oldData) => {

        setDataFromUpdate(oldData);

        setCreateVacancyModal(true);
    }
    return (
        <div className={classes.page}>
            <div className={classes.titleContainer}>
                <h2>Мои вакансии</h2>
                <CustomRedButton onClick={createVacancy}>Разместить вакансию</CustomRedButton>
            </div>
            <div className={classes.titlesFromVacancies}>
                <p>Название вакансии /</p>
                <p>Должность у вакансии /</p>
                <p>Статус вакансии</p>
            </div>
            <div className={classes.vacancyContainer}>
                {vacancy.myVacancies.length > 0 ? (
                    vacancy.myVacancies.map((vacancy) => (
                        <EmployerVacancyCard key={vacancy.id} vacancy={vacancy} updateVacancy={updateVacancy} changeStatus={changeStatusVacancy} deleteVacancy={deleteThisVacancy}/>
                    ))
                ) : (
                    <p>Вакансии не найдены</p>
                )}
            </div>
            {modal && <ErrorModal message={error} onClose={() => setModal(false)}/>}
            {createVacancyModal &&
                (<CreateUpdateVacancy oldData={dataFromUpdate}
                    onCLose={() => setCreateVacancyModal(false)}
                positions={positions.allPositions}
                    busyness={filters.allBusyness}
                currencies={filters.allCurrencies}
                workExperiences={filters.allWorkExperiences}
                workFormats={filters.allWorkFormats}
                                      idEmployer={user.id}
                    trigger={() => {setTrigger(prev => prev + 1)}}/>
                )}
        </div>
    );
});

export default MyVacancies;