import React, {useState} from 'react';
import classes from './menu.module.css'
import {deleteWorkFormat} from "../../API/adminAPI.js";
import CustomRedButton from "../UI/customRedButton/CustomRedButton.jsx";
import CreateUpdateWorkFormat from "../../Modal/admin/createUpdateWorkFormat.jsx";
import WorkFormatCard from "./cards/workFormatCard.jsx";
import {observer} from "mobx-react-lite";

const WorkFormatMenu = observer(({workFormats, trigger}) => {
    const [modalUpdate, setModalUpdate] = useState(false);
    const [oldDataForUpdate, setOldDataForUpdate] = useState(undefined);
    const deleteThisBusyness = async (id) => {
        try{
            const {data} = await deleteWorkFormat(id);
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
                <h2>Формат работы</h2>
                <CustomRedButton onClick={createBusyness}>Добавить формат работы</CustomRedButton>
            </div>
            <div className={classes.dataContainer}>
                {workFormats.length > 0 ?
                    (workFormats.map(format => <WorkFormatCard key={format.id} workFormat={format} updateModal={updateThisData} deleteFunc={deleteThisBusyness}/>)) : <p>Виды форматов работы не найдены</p>}
            </div>
            {modalUpdate && <CreateUpdateWorkFormat onClose={() => setModalUpdate(false)} oldData={oldDataForUpdate} trigger={trigger}/>
            }
        </div>
    );
});

export default WorkFormatMenu;