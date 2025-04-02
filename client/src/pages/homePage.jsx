import React, {useContext, useEffect, useState} from 'react';
import CustomInput from "../components/UI/CustomInput/customInput.jsx";
import {getTopVacancies} from "../API/vacanciesAPI.js";
import {observer} from "mobx-react-lite";
import {Context} from "../main.jsx";
import VacancyCard from "../components/HomePage/VacancyCard.jsx";
import classes from "../styles/homePage.module.css";
import {getPositions} from "../API/positionAPI.js";
import PositionCard from "../components/HomePage/PositionCard.jsx";
import {getAllEmployees, getPopularEmployees} from "../API/employeeAPI.js";
import EmployeeCard from "../components/HomePage/EmployeeCard.jsx";
import CustomRedButton from "../components/UI/customRedButton/CustomRedButton.jsx";
import {useNavigate} from "react-router-dom";
import {EMPLOYEES_ROUTE, VACANCIES_ROUTE} from "../utils/consts.js";

const HomePage = observer(() => {
    const {vacancy, positions, employees} = useContext(Context);
    useEffect(() => {
        getTopVacancies().then(data => vacancy.setTopVacancies(data));
        getPositions().then(data => positions.setPositions(data));
        getPopularEmployees().then(data => employees.setTopEmployees(data));
        window.scrollTo(0, 0);
    }, []);
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const clickToMoreVacancies = () => {
        navigate(VACANCIES_ROUTE);
    }
    const clickToMoreEmployee = () => {
        navigate(EMPLOYEES_ROUTE);
    }
    const searchVacancies = (event) => {
        if (event.key === "Enter") {
            navigate(VACANCIES_ROUTE + `?name=${search}`);
        }
    }
    return (
        <div className={classes.homePage}>
            <div>
                <CustomInput type="text" onKeyDown={searchVacancies} placeholder="Поиск вакансий" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <h3>Популярные вакансии</h3>
            <div className={classes.popularVacancies}>
                {vacancy.topVacancies.length > 0 ? (
                    vacancy.topVacancies.map((vacancy) => (
                        <VacancyCard key={vacancy.id} vacancy={vacancy} />
                    ))
                ) : (
                    <p>Нет топовых вакансий</p>
                )}
            </div>
            <CustomRedButton onClick = {clickToMoreVacancies}>Больше вакансий</CustomRedButton>
            <h3>Компании дня</h3>
            <div className={classes.popularEmployee}>
                {employees.topEmployees.length > 0 ? (
                    employees.topEmployees.map((employee) => (
                        <EmployeeCard key={employee.id} employee={employee}/>
                    ))
                ) : (
                    <p>Нет популярных работодателей</p>
                )}
            </div>
            <CustomRedButton onClick = {clickToMoreEmployee}>Просмотреть всех работодателей</CustomRedButton>

            <h3>Популярные специальности</h3>
            <div className={classes.popularPositions}>
                {positions.topPositions.length > 0 ? (
                    positions.topPositions.map((position) => (
                        <PositionCard key={position.id} position={position}/>
                    ))
                ) : (
                    <p>Нет топовых должностей</p>
                )}
            </div>
        </div>
    );
});

export default HomePage;