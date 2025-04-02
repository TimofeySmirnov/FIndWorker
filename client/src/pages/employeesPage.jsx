import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../main.jsx";
import {getAllEmployees} from "../API/employeeAPI.js";
import CustomInput from "../components/UI/CustomInput/customInput.jsx";
import EmployeeCard from "../components/employessPage/employeeCard.jsx";
import classes from '../styles/employessPage.module.css'
import Pagination from "../components/UI/Pagination/Pagination.jsx";


const EmployeesPage = observer(() => {
    const {employees} = useContext(Context)
    const [search, setSearch] = useState("");

    useEffect(() => {getAllEmployees(search).then((response) => {employees.setSearchAllEmployees(response.rows); }) }, [search])
    return (
        <div className={classes.page}>
            <div>
                <h2>Работодатели</h2>
                <CustomInput placeholder="Поиск работодателя" type="text" value={search}
                             onChange={e => setSearch(e.target.value)}/>
            </div>
            <div className={classes.employeesContainer}>
                {employees.searchAllEmployees.length > 0 && (employees.searchAllEmployees.map((employee) => (<EmployeeCard employee={employee} key={employee.id} />)))}
                {employees.searchAllEmployees.length > 0 ? null : <p>Работодатели не найдены</p>}
            </div>

        </div>
    );
});

export default EmployeesPage;