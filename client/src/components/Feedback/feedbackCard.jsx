import React, {useState} from 'react';
import dayjs from "dayjs";
import classes from './feedbackCard.module.css'
import CustomRedButton from "../UI/customRedButton/CustomRedButton.jsx";
import RateStars from "./rateStars.jsx";
import FeedbackModal from "../../Modal/feedback/feedbackModal.jsx";

const FeedbackCard = ({feedback, token, deleteFeedback, trigger}) => {
    const [update, setUpdate] = useState(false);
    const dateCreate = dayjs((feedback.createdAt)).format('DD-MM-YYYY');
    const dateUpdate = dayjs((feedback.updateAt)).format('DD-MM-YYYY');

    const checkToRedact = () => {
        if (token && token.role === 'USER' && Number(token.id) === Number(feedback.idApplicant)) {
            return (
                <>
                    <CustomRedButton onClick={() => {setUpdate(true)}}>Редактировать отзыв</CustomRedButton>
                    <CustomRedButton onClick={() => {deleteFeedback(feedback.id)}}>Удалить отзыв</CustomRedButton>
                </>
            )
        }
        return null
    }
    const needModal = () => {
        if(token && token.role === 'USER' && Number(token.id) === Number(feedback.idApplicant)) {
            return (
                <>
                {update ? (<FeedbackModal trigger={trigger} oldData={feedback} onClose={() => {setUpdate(false)}}/>) : null}
                </>
            )
        }
        return null
    }

    return (
        <div className={classes.card}>
            <div className={classes.firstContainer}>
                <h2>{feedback.name}</h2>
                <div className={classes.buttonsContainer}>
                    {checkToRedact(token)}
                </div>
            </div>
            <div className={classes.title}>
                <h3>{feedback.applicant.lastName} {feedback.applicant.firstName}</h3>
                <RateStars rate={feedback.rate}/>
            </div>
            <div className={classes.mainDataContainer}>
                <p>{feedback.description}</p>
                <p>Размещен: {dateCreate}</p>
                <p>Последнее обновление: {dateUpdate}</p>
            </div>
            {needModal(token)}
        </div>
    );
};

export default FeedbackCard;