import React, {useState} from 'react';
import CustomRedButton from "../UI/customRedButton/CustomRedButton.jsx";
import BusynessCard from "./cards/busynessCard.jsx";
import {deleteBusyness} from "../../API/adminAPI.js";
import CreateUpdateBusyness from "../../Modal/admin/createUpdateBusyness.jsx";
import classes from './menu.module.css'
import {observer} from "mobx-react-lite";

const BusynessMenu = observer(({busyness, trigger}) => {
    const [modalUpdate, setModalUpdate] = useState(false);
    const [oldDataForUpdate, setOldDataForUpdate] = useState(undefined);
    const deleteThisBusyness = async (id) => {
        try{
            const {data} = await deleteBusyness(id);
            trigger();
            console.log(data)
        }catch (error){

        }
    }
    const updateThisBusyness = (oldData) => {
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
                <h2>Занятость</h2>
                <CustomRedButton onClick={createBusyness}>Добавить вид занятости</CustomRedButton>
            </div>
            <div className={classes.dataContainer}>
                {busyness.length > 0 ?
                    (busyness.map(busy => <BusynessCard key={busy.id} busyness={busy} updateModal={updateThisBusyness} deleteFunc={deleteThisBusyness}/>)) : <p>Виды занятости не найдены</p>}
            </div>
            {modalUpdate && <CreateUpdateBusyness onClose={() => setModalUpdate(false)} oldData={oldDataForUpdate} trigger={trigger}/>
            }
        </div>
    );
});

export default BusynessMenu;