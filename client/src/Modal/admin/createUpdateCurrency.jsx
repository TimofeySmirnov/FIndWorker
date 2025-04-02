import React, {useState} from 'react';
import {createCurrency, updateCurrency} from "../../API/adminAPI.js";
import CustomInput from "../../components/UI/CustomInput/customInput.jsx";
import CustomRedButton from "../../components/UI/customRedButton/CustomRedButton.jsx";
import ErrorModal from "../modalForErrors/errorModal.jsx";
import classes from "./adminModals.module.css";
import {observer} from "mobx-react-lite";

const CreateUpdateCurrency = observer(({onClose, oldData, trigger}) => {
    const [currency, setCurrency] = useState(oldData?.currency || '');
    const [symbol, setSymbol] = useState(oldData?.symbol || '');
    const [error, setError] = useState('');
    const [modal, setModal] = useState(false);
    const click = async (event, id) => {
        event.preventDefault();
        try{
            const {data} = await oldData ? updateCurrency(id, {currency, symbol}) : createCurrency(currency, symbol);
            setError("Успешно");
            setModal(true);
            onClose();
            trigger()
        }catch(error){
            setError(error.response.data.error || error.response.data.message || 'Что то пошло не так');
            setModal(true);
        }
    }
    return (
        <div className={classes.modalOverlay}>
            <div className={classes.container}>
                <button onClick={() => onClose()} className={classes.closeBtn}>X</button>
                <form>
                    {oldData ? (<h4>Обновление валюты</h4>) : (<h4>Создание валюты</h4>)}
                    <CustomInput  type='text' placeholder='Укажите название валюты' value={currency}
                                 onChange={e => setCurrency(e.target.value)}/>
                    <CustomInput maxLength='1' type='text' placeholder='Укажите символ валюты' value={symbol}
                                 onChange={e => setSymbol(e.target.value)}/>
                    <CustomRedButton onClick={(event) => {
                        click(event, oldData?.id)
                    }}>Сохранить</CustomRedButton>
                </form>
                {modal && <ErrorModal message={error} onClose={() => setModal(false)}/>}
            </div>
        </div>
    );
});

export default CreateUpdateCurrency;