import React, {useEffect} from 'react';
import dayjs from "dayjs";
import CustomRedButton from "../UI/customRedButton/CustomRedButton.jsx";
import {useNavigate, useNavigation} from "react-router-dom";
import {RESUME_ROUTE, VIEW_APPLICANT_PROFILE_ROUTE} from "../../utils/consts.js";
import classes from './mainRecall.module.css'


const MainRecallCard = ({recall, approve, reject}) => {
    const navigate = useNavigate();
    const dateRecall = dayjs(recall.createdAt).format('DD-MM-YYYY');
    const click = () => {
        if(recall.idResume){
            navigate(RESUME_ROUTE.replace(':id', recall.idResume));
            return
        }
        navigate(VIEW_APPLICANT_PROFILE_ROUTE.replace(':id', recall.idApplicant));
    }
    let color = 'black';
    const colorStatus = () => {
        if(recall.status === 'APPROVED'){
            color = 'green'
            return (<p style={{color: color}}>{recall.status}</p>)
        }
        if(recall.status === 'REJECTED'){
            color = 'red'
            return (<p style={{color: color}}>{recall.status}</p>)
        }
        return (<p style={{color: color}}>{recall.status}</p>)
    }
    useEffect(() => {
        colorStatus();

    }, [recall]);
    return (
        <div className={classes.card}>

            <div onClick={click} className={classes.mainData}>
                <h4>{recall.applicant.lastName}</h4>
                <h4>{recall.applicant.firstName}</h4>
                <div className={classes.statusBar}>
                    <p>Статус:</p>
                    {colorStatus()}
                </div>

                <p>Дата отклика: {dateRecall}</p>
            </div>
            { recall.status === 'PENDING' ? (<div className={classes.button}>
                <CustomRedButton onClick={() => {approve(recall.id)}}>Одобрить отклик</CustomRedButton>
                <CustomRedButton onClick={() => {reject(recall.id)}}>Отклонить отклик</CustomRedButton>
            </div>) : null}

        </div>
    );
};

export default MainRecallCard;