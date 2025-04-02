import React, {useState} from 'react';
import classes from "./adminModals.module.css";
import CustomRedButton from "../../components/UI/customRedButton/CustomRedButton.jsx";
import CustomInput from "../../components/UI/CustomInput/customInput.jsx";
import ErrorModal from "../modalForErrors/errorModal.jsx";
import {createWorkFormat, updateWorkFormat} from "../../API/adminAPI.js";
import {observer} from "mobx-react-lite";

const CreateUpdateWorkFormat = observer(({onClose, oldData, trigger}) => {
    const [name, setName] = useState(oldData?.name || '');
    const [error, setError] = useState('');
    const [modal, setModal] = useState(false);
    const click = async (event, id) => {
        event.preventDefault();
        try{
            const {data} = await oldData ? updateWorkFormat(id, name) : createWorkFormat(name);
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
                    {oldData ? (<h4>Обновление опыта работа</h4>) : (<h4>Создание опыта работа</h4>)}
                    <CustomInput type='text' placeholder='Укажите название формата работы' value={name}
                                 onChange={e => setName(e.target.value)}/>
                    <CustomRedButton onClick={(event) => {
                        click(event, oldData?.id)
                    }}>Сохранить</CustomRedButton>
                </form>
                {modal && <ErrorModal message={error} onClose={() => setModal(false)}/>}
            </div>
        </div>
    );
});

export default CreateUpdateWorkFormat;