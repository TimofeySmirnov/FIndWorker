import React, {useState} from 'react';
import {createBusyness, updateBusyness} from "../../API/adminAPI.js";
import CustomRedButton from "../../components/UI/customRedButton/CustomRedButton.jsx";
import CustomInput from "../../components/UI/CustomInput/customInput.jsx";
import classes from "./adminModals.module.css";
import ErrorModal from "../modalForErrors/errorModal.jsx";
import {observer} from "mobx-react-lite";

const CreateUpdateBusyness = observer(({onClose, oldData, trigger}) => {
    const [nameBusyness, setNameBusyness] = useState(oldData?.nameBusyness || '');
    const [error, setError] = useState('');
    const [modal, setModal] = useState(false);
    const click = async (event, id) => {
        event.preventDefault();
        try{
            const {data} = await oldData ? updateBusyness(id, nameBusyness) : createBusyness(nameBusyness);

            onClose();
            trigger()
            setError("Успешно");
            setModal(true);
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
                    {oldData ? (<h4>Обновление занятости</h4>) : (<h4>Создание занятости</h4>)}
                    <CustomInput type='text' placeholder='Укажите название занятости' value={nameBusyness}
                                 onChange={e => setNameBusyness(e.target.value)}/>
                    <CustomRedButton onClick={(event) => {
                        click(event, oldData?.id)
                    }}>Сохранить</CustomRedButton>
                </form>
                {modal && <ErrorModal message={error} onClose={() => setModal(false)}/>}
            </div>
        </div>
    );
});

export default CreateUpdateBusyness;