import React from 'react';
import classes from './menu.module.css'
import ModerationVacancyCard from "./cards/moderationVacancyCard.jsx";
import {applyVacancy, rejectVacancy} from "../../API/adminAPI.js";
import {observer} from "mobx-react-lite";

const ModerationVacanciesMenu = observer(({moderationVacancies, trigger}) => {

    const applyThisVacancy = async (id) => {
        try{
            const {data} = await applyVacancy(id);
            trigger();
            console.log(data)
        }catch (error){

        }
    }
    const rejectThisVacancy = async (id) => {
        try{
            const {data} = await rejectVacancy(id);
            trigger();
            console.log(data)
        }catch (error){

        }
    }
    return (
        <div className={classes.menu}>
            <div className={classes.header}>
                <h2>Вакансии на модерации</h2>
            </div>
            <div className={classes.dataContainer}>
                {moderationVacancies.length > 0 ?
                    (moderationVacancies.map(vacancy => <ModerationVacancyCard key={vacancy.id} vacancy={vacancy} rejectFunc={rejectThisVacancy} applyFunc={applyThisVacancy}/>)) : <p>Вакансии не найдены</p>}
            </div>
        </div>
    );
});
export default ModerationVacanciesMenu;