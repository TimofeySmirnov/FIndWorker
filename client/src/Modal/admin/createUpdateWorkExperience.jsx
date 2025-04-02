import React, {useState} from 'react';
import classes from "./adminModals.module.css";
import {createWorkExperience, updateWorkExperience} from "../../API/adminAPI.js";
import CustomInput from "../../components/UI/CustomInput/customInput.jsx";
import CustomRedButton from "../../components/UI/customRedButton/CustomRedButton.jsx";
import ErrorModal from "../modalForErrors/errorModal.jsx";
import {observer} from "mobx-react-lite";

const CreateUpdateWorkExperience = observer(({onClose, oldData, trigger}) => {
    const [name, setName] = useState(oldData?.name || '');
    const [error, setError] = useState('');
    const [modal, setModal] = useState(false);
    const click = async (event, id) => {
        event.preventDefault();
        try{
            const {data} = await oldData ? updateWorkExperience(id, name) : createWorkExperience(name);
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
                    <CustomInput type='text' placeholder='Укажите название опыта работы' value={name}
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

export default CreateUpdateWorkExperience;