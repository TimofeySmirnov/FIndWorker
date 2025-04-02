import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {useParams} from "react-router-dom";
import {approveRecall, getMyRecallsByVacancy, rejectRecall} from "../API/recallsAPI.js";
import {Context} from "../main.jsx";
import MainRecallCard from "../components/recall/mainRecallCard.jsx";
import classes from '../styles/recallsPage.module.css'
import ErrorModal from "../Modal/modalForErrors/errorModal.jsx";

const RecallsPage = observer(() => {
    const {id} = useParams();
    const {recalls} = useContext(Context)
    const [error, setError] = useState('');
    const [modal, setModal] = useState(false);
    const [trigger, setTrigger] = useState(false);
    useEffect(() => {
        getMyRecallsByVacancy(id).then(data => {recalls.setRecallsByVacancy(data)});
        console.log(recalls.recallsByVacancy);
    }, [id, trigger]);
    const approveThisRecall = async (id) => {
        try{
            const {data} = await approveRecall(id);
            setTrigger(!trigger);
            setError("Отклик одобрен");
            setModal(true);
        }catch(error){
            setError(error.response.data.message|| error.response.data.error || 'Что то пошло не так');
            setModal(true);
        }
    }
    const rejectThisRecall = async (id) => {
        try{
            const {data} = await rejectRecall(id);
            setTrigger(!trigger);
            setError("Отклик отклонен");
            setModal(true);
        }catch(error){
            setError(error.response.data.message|| error.response.data.error || 'Что то пошло не так');
            setModal(true);
        }
    }
    return (
        <div className={classes.page}>
            <h2>Отклики на вакансию</h2>
            <div className={classes.recallsContainer}>
                {recalls.recallsByVacancy.length > 0 ?
                    (recalls.recallsByVacancy.map((recall) =>
                        (<MainRecallCard key={recall.id} recall={recall} reject={rejectThisRecall} approve={approveThisRecall}/>)))
                    : <p>Отклики не найдены</p>}

            </div>
            {modal && <ErrorModal message={error} onClose={() => setModal(false)}/>}
        </div>
    );
});

export default RecallsPage;