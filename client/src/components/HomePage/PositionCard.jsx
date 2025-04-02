import React, {useContext, useEffect} from 'react';
import classes from './positionCard.module.css'
import {useNavigate} from "react-router-dom";
import {VACANCIES_ROUTE} from "../../utils/consts.js";
import {Context} from "../../main.jsx";
import {getTopVacancies} from "../../API/vacanciesAPI.js";
import {getPositions} from "../../API/positionAPI.js";
import {getPopularEmployees} from "../../API/employeeAPI.js";

const PositionCard = ({position}) => {
    const navigate = useNavigate();

    const colors = [
        '#A8D08D', // Светло-оливковый (Light Olive Green)
        '#9ACD32', // Желтовато-зеленый (Yellow Green)
        '#5FA8D3', // Светлый стальной синий (Light Steel Blue)
        '#7AC9C7', // Светлый кадетский синий (Light Cadet Blue)
        '#A9A9A9', // Светлый серый сланец (Light Slate Gray)
        '#D3D3D3', // Светлый серый (Light Gray)
        '#D2691E', // Светлый седло-коричневый (Light Saddle Brown)
        '#66CDAA', // Светлый темно-серо-зеленый (Light Dark Slate Gray)
        '#A9A9A9', // Светло-серый (Light Dim Gray)
        '#7B68EE', // Светло-темно-синий (Light Dark Slate Blue)
        '#8A2BE2', // Светлый индиго (Light Indigo)
        '#CD5C5C'  // Светлый марун (Light Maroon)
    ];

    const colorRandom = Math.floor(Math.random() * colors.length);
    const color = colors[colorRandom];
    const clickToPosition = (id) => {
        navigate(VACANCIES_ROUTE + `?idPosition=${id}`);
    }
    return (
        <div className={classes.positionCard} style={{backgroundColor : color}} onClick={() => {clickToPosition(position.id)}}>
            <p>{position.name} - {position.vacancyCount} вакансий</p>
        </div>
    );
};

export default PositionCard;