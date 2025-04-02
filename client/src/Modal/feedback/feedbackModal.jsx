import React, {useState} from 'react';
import CustomInput from "../../components/UI/CustomInput/customInput.jsx";
import ClickToRateStars from "../../components/Feedback/clickToRateStars.jsx";
import CustomRedButton from "../../components/UI/customRedButton/CustomRedButton.jsx";
import {createFeedback, updateFeedback} from "../../API/feedbacksAPI.js";
import classes from './feedbackModa.module.css'
import ErrorModal from "../modalForErrors/errorModal.jsx";


const FeedbackModal = ({oldData, onClose, idEmployer, trigger}) => {
    const [name, setName] = useState(oldData?.name || '');
    const [description, setDescription] = useState(oldData?.description || '');
    const [rate, setRate] = useState(Number(oldData?.rate) || 0);
    const [error, setError] = useState('');
    const [modal, setModal] = useState(false);

    const updateThisFeedback = async (e) => {
        e.preventDefault();
        try{
            const data = await updateFeedback(oldData.id, {name, description, rate});
            console.log(data);
            trigger(prev => prev + 1);
            onClose();
        }catch(err){
            setError(err.response.data.error || err.response.data.message || 'Что то пошло не так');
            setModal(true);
        }
    }

    const createThisFeedback = async (e) => {
        e.preventDefault();
        try{
            console.log(rate)
            const data = await createFeedback(idEmployer, {name, description, rate});
            console.log(data);
            trigger(prev => prev + 1);
            onClose();
        }catch(err){
            setError(err.response.data.error || err.response.data.message || 'Что то пошло не так');
            setModal(true);
        }
    }

    return (
        <div className={classes.modalOverlay}>
            <div className={classes.container}>
                <button onClick={() => onClose()} className={classes.closeBtn}>X</button>
                <form className={classes.form}>
                    <ClickToRateStars setRating={setRate} initialRating={rate}/>
                    <CustomInput type='text' placeholder='Введите заголовок отзыва' value={name}
                                 onChange={e => setName(e.target.value)}/>
                    <CustomInput type='text' placeholder='Введите текст отзыва' value={description}
                                 onChange={e => setDescription(e.target.value)}/>
                    {oldData ? (<CustomRedButton onClick={(event) => {
                        updateThisFeedback(event)
                    }}>Отредактировать</CustomRedButton>) : (<CustomRedButton onClick={(event) => {
                        createThisFeedback(event)
                    }}>Добавить отзыв</CustomRedButton>)}
                </form>
                {modal && <ErrorModal message={error} onClose={() => setModal(false)}/>}
            </div>

        </div>
    );
};

export default FeedbackModal;