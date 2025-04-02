import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../main.jsx";
import {getAllVacancies} from "../API/vacanciesAPI.js";
import {getALlPosition} from "../API/positionAPI.js";
import {getAllEmployees} from "../API/employeeAPI.js";
import {getAllBusyness, getAllCurrencies, getAllWorkExperiences, getAllWorkFormats} from "../API/filtersAPI.js";
import {useSearchParams} from "react-router-dom";
import MainVacancyCard from "../components/vacanciesPage/MainVacancyCard/mainVacancyCard.jsx";
import CustomInput from "../components/UI/CustomInput/customInput.jsx";
import classes from '../styles/vacanciesPage.module.css'
import CustomRedButton from "../components/UI/customRedButton/CustomRedButton.jsx";
import {getPageCount} from "../utils/pagination.js";
import Pagination from "../components/UI/Pagination/Pagination.jsx";


const VacanciesPage = observer(() => {
    const [searchParams] = useSearchParams();
    const {vacancy, positions, employees, filters} = useContext(Context);
    const [totalCount, setTotalCount] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [filtersForVacancies, setFiltersForVacancies] = useState({
        idBusyness: searchParams.get("idBusyness") || null,
        idCurrency: searchParams.get("idCurrency") || null,
        idWorkFormat: searchParams.get("idWorkFormat") || null,
        idWorkExperience: searchParams.get("idWorkExperience") || null,
        idPosition: searchParams.get("idPosition") || null,
        idEmployee: searchParams.get("idEmployee") || null,
        name: searchParams.get("name") || "",
        page: 1,
        limit: 10,
    });

    useEffect(() => {
        getALlPosition().then(data => {positions.setAllPositions(data)});
        getAllEmployees('').then(data => {employees.setAllEmployees(data.rows)});
        getAllBusyness().then(data => {filters.setBusyness(data.getData);
            });
        getAllCurrencies().then(data => {filters.setCurrencies(data.getData)});
        getAllWorkExperiences().then(data => {filters.setWorkExperiences(data.getData)});
        getAllWorkFormats().then(data => {filters.setWorkFormats(data.getData)});
        window.scrollTo(0, 0);}, [])


    useEffect(() => {getAllVacancies(filtersForVacancies).then(data => {vacancy.setAllVacancies(data.rows); setTotalCount(Number(data.count)); setTotalPage(getPageCount(Number(data.count), filtersForVacancies.limit))
        });

        }, [filtersForVacancies]);

    const resetFilters = () => {
        setFiltersForVacancies((prevFilters) => ({
            idBusyness: null,
            idCurrency: null,
            idWorkFormat: null,
            idWorkExperience: null,
            idPosition: null,
            idEmployee: null,
            name: "",
            page: prevFilters.page,
            limit: prevFilters.limit,
        }));
    };

    const setPage = (page) => {
        setFiltersForVacancies(prev => ({
            ...prev,
            page: page
        }))
    }

    return (
        <div className={classes.page}>

            <div className={classes.filtersContainer}>
                <h2>Фильтры вакансий</h2>
                <div className={classes.filterElement}>
                    <CustomInput placeholder="Поиск по названию" value={filtersForVacancies.name}
                                 onChange={e => setFiltersForVacancies(prev => ({
                                     ...prev,
                                     name: e.target.value
                                 }))}/>
                    <CustomRedButton onClick={resetFilters}>Сбросить фильтры</CustomRedButton>
                </div>

                <div className={classes.filterBlock}>
                    <p>Занятость</p>
                    {filters.allBusyness.length > 0 ? filters.allBusyness.map(busy =>
                            (<label className={classes.filterElement}> <CustomInput type="radio" key={busy.id} name='busy'
                                                                                    value={busy.id}
                                                                                    onClick={e => setFiltersForVacancies(prev => ({
                                                                                        ...prev,
                                                                                        idBusyness: e.target.value
                                                                                    }))}/> {busy.nameBusyness}</label>)) :
                        <p>Ошибка в подрузке фильтра</p>}
                </div>
                <hr className={classes.hr}/>
                <div className={classes.filterBlock}>
                    <p>Валюта</p>
                    {filters.allCurrencies.length > 0 ? filters.allCurrencies.map(currency =>
                            (<label className={classes.filterElement}> <CustomInput type="radio" key={currency.id}
                                                                                    name='currency' value={currency.id}
                                                                                    onClick={e => setFiltersForVacancies(prev => ({
                                                                                        ...prev,
                                                                                        idCurrency: e.target.value
                                                                                    }))}/> {currency.symbol}</label>)) :
                        <p>Ошибка в подрузке фильтра</p>}
                </div>
                <hr className={classes.hr}/>
                <div className={classes.filterBlock}>
                    <p>Опыт работы</p>
                    {filters.allWorkExperiences.length > 0 ? filters.allWorkExperiences.map(workExp =>
                            (<label className={classes.filterElement}> <CustomInput type="radio" key={workExp.id}
                                                                                    name='workExp' value={workExp.id}
                                                                                    onClick={e => setFiltersForVacancies(prev => ({
                                                                                        ...prev,
                                                                                        idWorkExperience: e.target.value
                                                                                    }))}/> {workExp.name}</label>)) :
                        <p>Ошибка в подрузке фильтра</p>}
                </div>
                <hr className={classes.hr}/>
                <div className={classes.filterBlock}>
                    <p>Формат работы</p>
                    {filters.allWorkFormats.length > 0 ? filters.allWorkFormats.map(workForm =>
                            (<label className={classes.filterElement}> <CustomInput type="radio" key={workForm.id}
                                                                                    name='workForm' value={workForm.id}
                                                                                    onClick={e => setFiltersForVacancies(prev => ({
                                                                                        ...prev,
                                                                                        idWorkFormat: e.target.value
                                                                                    }))}/> {workForm.name}</label>)) :
                        <p>Ошибка в подрузке фильтра</p>}
                </div>
                <hr className={classes.hr}/>
                <div className={classes.filterBlock}>
                    <p>должность</p>
                    <select onChange={e => setFiltersForVacancies(prev => ({
                        ...prev,
                        idPosition: e.target.value
                    }))}>
                        <option value="">Выберите должность</option>
                        {positions.allPositions.map((position) => (
                            <option key={position.id} value={position.id}>
                                {position.name}
                            </option>
                        ))}
                    </select>
                </div>
                <hr className={classes.hr}/>
                <div className={classes.filterBlock}>
                    <p>Работодатель</p>
                    {employees.allEmployees.length > 0 ? (
                    <select onChange={e => setFiltersForVacancies(prev => ({
                        ...prev,
                        idEmployee: e.target.value
                    }))}>
                        <option value="">Выберите работодателя</option>
                        {employees.allEmployees.map((employer) => (
                            <option key={employer.id} value={employer.id}>
                                {employer.name}
                            </option>
                        ))}
                    </select> ) : <p>Работодатели не найдены </p>
                    }
                </div>
                <hr className={classes.hr}/>
            </div>
            <div className={classes.vacanciesContainer}>
                <h2>Найдено {totalCount} вакансий</h2>
                    {vacancy.allVacancies.length > 0 ? (
                        vacancy.allVacancies.map((vacancy) => (
                            <MainVacancyCard key={vacancy.id} vacancy={vacancy}/>
                        ))
                    ) : (
                        <p>Вакансии не найдены</p>
                    )}
                <Pagination
                    page={filtersForVacancies.page}
                    changePage={setPage}
                    totalCount={totalPage}
                />
            </div>
        </div>
    );
});

export default VacanciesPage;