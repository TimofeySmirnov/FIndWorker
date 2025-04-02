import React, {useState} from 'react';
import {deleteApplicant} from "../../API/adminAPI.js";
import classes from './menu.module.css'
import ApplicantCard from "./cards/applicantCard.jsx";
import {observer} from "mobx-react-lite";

const ApplicantMenu = observer(({applicants, trigger}) => {
    const [modalUpdate, setModalUpdate] = useState(false);
    const [oldDataForUpdate, setOldDataForUpdate] = useState(undefined);
    const deleteThisApplicant = async (id) => {
        try{
            const {data} = await deleteApplicant(id);
            trigger();
            console.log(data)
        }catch (error){

        }
    }


    return (
        <div className={classes.menu}>
            <div className={classes.header}>
                <h2>Модерация соискателей</h2>
            </div>
            <div className={classes.dataContainer}>
                {applicants.length > 0 ?
                    (applicants.map(applicant => <ApplicantCard key={applicant.id} applicant={applicant} deleteFunc={deleteThisApplicant}/>)) : <p>Соискатели не найдены</p>}
            </div>

        </div>
    );
});

export default ApplicantMenu;