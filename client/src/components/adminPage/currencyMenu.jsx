import React, {useState} from 'react';
import {deleteCurrency} from "../../API/adminAPI.js";
import CustomRedButton from "../UI/customRedButton/CustomRedButton.jsx";
import CreateUpdateCurrency from "../../Modal/admin/createUpdateCurrency.jsx";
import CurrencyCard from "./cards/currencyCard.jsx";
import classes from './menu.module.css'
import {observer} from "mobx-react-lite";

const CurrencyMenu = observer(({currencies, trigger}) => {
    const [modalUpdate, setModalUpdate] = useState(false);
    const [oldDataForUpdate, setOldDataForUpdate] = useState(undefined);
    const deleteThisBusyness = async (id) => {
        try{
            const {data} = await deleteCurrency(id);
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
                <h2>Валюта</h2>
                <CustomRedButton onClick={createBusyness}>Добавить валюту</CustomRedButton>
            </div>
            <div className={classes.dataContainer}>
                {currencies.length > 0 ?
                    (currencies.map(busy => <CurrencyCard key={busy.id} currency={busy} updateModal={updateThisBusyness} deleteFunc={deleteThisBusyness}/>)) : <p>Виды валют не найдены</p>}
            </div>
            {modalUpdate && <CreateUpdateCurrency onClose={() => setModalUpdate(false)} oldData={oldDataForUpdate} trigger={trigger}/>
            }
        </div>
    );
});

export default CurrencyMenu;