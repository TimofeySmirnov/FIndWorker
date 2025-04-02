import React, {useContext, useEffect, useMemo, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../main.jsx";
import BusynessMenu from "../components/adminPage/busynessMenu.jsx";
import CurrencyMenu from "../components/adminPage/currencyMenu.jsx";
import WorkExperienceManu from "../components/adminPage/workExperienceManu.jsx";
import WorkFormatMenu from "../components/adminPage/workFormatMenu.jsx";
import PositionMenu from "../components/adminPage/positionMenu.jsx";
import ApplicantMenu from "../components/adminPage/applicantMenu.jsx";
import ModerationVacanciesMenu from "../components/adminPage/moderationVacanciesMenu.jsx";
import {getALlPosition} from "../API/positionAPI.js";
import {getAllBusyness, getAllCurrencies, getAllWorkExperiences, getAllWorkFormats} from "../API/filtersAPI.js";
import {getAllApplicants, getModerationVacancies} from "../API/adminAPI.js";
import classes from '../styles/admin.module.css'
import {runInAction} from "mobx";

const AdminPage = observer(() => {
    const {admin, vacancy, positions, filters, applicant} = useContext(Context);
    const [trigger, setTrigger] = useState(0);
    const callTrigger = () => {
        setTrigger((prev) => prev + 1);

    }
    const [activeTab, setActiveTab] = useState("Модерация вакансий");
    const TabContent = useMemo(() => ({
        "Занятость": <BusynessMenu trigger={callTrigger} busyness={filters.allBusyness} />,
        "Валюта": <CurrencyMenu trigger={callTrigger} currencies={filters.allCurrencies} />,
        "Опыт работы": <WorkExperienceManu trigger={callTrigger} workExps={filters.allWorkExperiences} />,
        "Формат работы": <WorkFormatMenu trigger={callTrigger} workFormats={filters.allWorkFormats} />,
        "Должности": <PositionMenu trigger={callTrigger} positions={positions.allPositions} />,
        "Соискатели": <ApplicantMenu trigger={callTrigger} applicants={applicant.allApplicants} />,
        "Модерация вакансий": <ModerationVacanciesMenu trigger={callTrigger} moderationVacancies={vacancy.moderationVacancies} />,
    }), [trigger, activeTab]);

    useEffect(() => {
        getALlPosition().then(data => runInAction(() => positions.setAllPositions(data))).catch(console.error);
        getAllBusyness().then(data => runInAction(() => filters.setBusyness(data.getData))).catch(console.error);
        getAllCurrencies().then(data => runInAction(() => filters.setCurrencies(data.getData))).catch(console.error);
        getAllWorkExperiences().then(data => runInAction(() => filters.setWorkExperiences(data.getData))).catch(console.error);
        getAllWorkFormats().then(data => runInAction(() => filters.setWorkFormats(data.getData))).catch(console.error);
        getAllApplicants().then(data => runInAction(() => applicant.setAllApplicants(data.getData))).catch(console.error);
        getModerationVacancies().then(data => runInAction(() => vacancy.setModerationVacancies(data))).catch(console.error);
        console.log("Сработал эффект")
    }, [trigger, activeTab]);






    return (
        <div className={classes.page}>
            <h1>Администрирование сайта</h1>
            <div className={classes.mainContainer}>
                <div className={classes.titlesContainer}>
                    <h3>Данные</h3>
                    {Object.keys(TabContent).map((key) => (
                        <p
                            key={key}
                            className={classes.menuItem}
                            onClick={() => setActiveTab(key)}
                        >
                            {key}
                        </p>
                    ))}
                </div>
                <div className={classes.dataContainer}>
                    {TabContent[activeTab]}

                </div>
            </div>

        </div>
    );
});

export default AdminPage;