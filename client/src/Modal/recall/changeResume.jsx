import React, {useState} from 'react';
import CustomRedButton from "../../components/UI/customRedButton/CustomRedButton.jsx";
import {recallToVacancy} from "../../API/recallsAPI.js";
import classes from "../vacancy/modalVacancy/vacancy.module.css";
import ErrorModal from "../modalForErrors/errorModal.jsx";

const ChangeResume = ({resumes, onClose, idVacancy}) => {
    const [selected, setSelected] = useState(null)
    const [error, setError] = useState("");
    const [modal, setModal] = useState(false);
    const recall = async (event) => {
        event.preventDefault();
        try{
            await recallToVacancy(idVacancy, selected);
            setError("Вы успешно откликнулись");
            setModal(true);
            onClose();
        }catch (error) {
            setError(error.response.data.error || error.response.data.message || 'Что то пошло не так');
            setModal(true);
        }
    }
    return (
        <div className={classes.modalOverlay}>
            <div className={classes.container}>
                <button onClick={() => onClose()} className={classes.closeBtn}>X</button>
                <form className={classes.form}>
                    <h3>Выберите резюме для отклика</h3>
                    <select onChange={e => setSelected(e.target.value)}>
                        <option value="">Выберите резюме</option>
                        {resumes.map((resume) => (
                            <option key={resume.id} value={resume.id}>
                                {resume.position?.name}
                            </option>
                        ))}
                    </select>
                    <CustomRedButton onClick={(event) => {
                        recall(event)
                    }}>Выбрать и откликнуться</CustomRedButton>
                </form>
                {modal && <ErrorModal message={error} onClose={() => setModal(false)}/>}
            </div>
        </div>
    );
};

export default ChangeResume;