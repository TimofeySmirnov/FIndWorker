import React, {useState} from 'react';
import {deleteWorkExperience} from "../../API/adminAPI.js";
import CreateUpdateBusyness from "../../Modal/admin/createUpdateBusyness.jsx";
import BusynessCard from "./cards/busynessCard.jsx";
import CustomRedButton from "../UI/customRedButton/CustomRedButton.jsx";
import classes from './menu.module.css'
import CreateUpdateWorkExperience from "../../Modal/admin/createUpdateWorkExperience.jsx";
import WorkExpCard from "./cards/workExpCard.jsx";
import {observer} from "mobx-react-lite";

const WorkExperienceManu = observer(({workExps, trigger}) => {
    const [modalUpdate, setModalUpdate] = useState(false);
    const [oldDataForUpdate, setOldDataForUpdate] = useState(undefined);
    const deleteThisBusyness = async (id) => {
        try{
            const {data} = await deleteWorkExperience(id);
            trigger();
            console.log(data)
        }catch (error){

        }
    }
    const updateThisData = (oldData) => {
        setOldDataForUpdate(oldData);
        setModalUpdate(true);
    }
    const createBusyness =  () => {
        setOldDataForUpdate(undefined);
        setModalUpdate(true);
    }
    return (
        <div className={classes.menu}>
            <div className={classes.header}>
                <h2>Опыт работы</h2>
                <CustomRedButton onClick={createBusyness}>Добавить вид опыта работы</CustomRedButton>
            </div>
            <div className={classes.dataContainer}>
                {workExps.length > 0 ?
                    (workExps.map(exp => <WorkExpCard key={exp.id} workExp={exp} updateModal={updateThisData} deleteFunc={deleteThisBusyness}/>)) : <p>Виды опыта работы не найдены</p>}
            </div>
            {modalUpdate && <CreateUpdateWorkExperience onClose={() => setModalUpdate(false)} oldData={oldDataForUpdate} trigger={trigger}/>
            }
        </div>
    );
});

export default WorkExperienceManu;