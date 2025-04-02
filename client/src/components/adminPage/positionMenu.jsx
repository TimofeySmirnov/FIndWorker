import React, {useState} from 'react';
import {deletePosition} from "../../API/adminAPI.js";
import CustomRedButton from "../UI/customRedButton/CustomRedButton.jsx";
import classes from './menu.module.css'
import CreateUpdatePosition from "../../Modal/admin/createUpdatePosition.jsx";
import PositionCard from "./cards/positionCard.jsx";
import {observer} from "mobx-react-lite";

const PositionMenu = observer(({positions, trigger}) => {
    const [modalUpdate, setModalUpdate] = useState(false);
    const [oldDataForUpdate, setOldDataForUpdate] = useState(undefined);
    const deleteThisBusyness = async (id) => {
        try{
            const {data} = await deletePosition(id);
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
                <h2>Должности</h2>
                <CustomRedButton onClick={createBusyness}>Добавить должность</CustomRedButton>
            </div>
            <div className={classes.dataContainer}>
                {positions.length > 0 ?
                    (positions.map(position => <PositionCard key={position.id} position={position} updateModal={updateThisBusyness} deleteFunc={deleteThisBusyness}/>)) : <p>Виды валют не найдены</p>}
            </div>
            {modalUpdate && <CreateUpdatePosition onClose={() => setModalUpdate(false)} oldData={oldDataForUpdate} trigger={trigger}/>
            }
        </div>
    );
});


export default PositionMenu;