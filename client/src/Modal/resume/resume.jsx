import React, {useContext, useEffect, useState} from 'react';
import {getALlPosition} from "../../API/positionAPI.js";
import {Context} from "../../main.jsx";
import classes from "../../styles/modal.module.css";
import CustomInput from "../../components/UI/CustomInput/customInput.jsx";
import CustomRedButton from "../../components/UI/customRedButton/CustomRedButton.jsx";
import ErrorModal from "../modalForErrors/errorModal.jsx";

import {createResume, updateResume} from "../../API/resumesAPI.js";
import {observer} from "mobx-react-lite";

const Resume = observer(({oldResume, onCloseModal}) => {
    const {positions} = useContext(Context);
    const [idPosition, setIdPosition] = useState(oldResume?.idPosition || null);
    const [education, setEducation] = useState(oldResume?.education || "");
    const [skills, setSkills] = useState(oldResume?.skills || "");
    const [city, setCity] = useState(oldResume?.city || "");
    const [experience, setExperience] = useState(oldResume?.experience || "");
    const [links, setLinks] = useState(oldResume?.links || "");
    const [error, setError] = useState("");
    const [modal, setModal] = useState(false);

    useEffect(() => {
        getALlPosition().then(data => {
            positions.setAllPositions(data);
        });
    }, []);
    const setResponseError = (error) => {
        setError(error.response.data.message || error.response.data.error || 'Что то пошло не так')
    }

    const fields = {idPosition, education, skills, city, experience, links}

    const click = async (e) => {
        e.preventDefault()
        try{
            const data = oldResume ? await updateResume(oldResume?.id, fields) : await createResume(fields);
            console.log(data)
            onCloseModal()
        }catch(error){
            setResponseError(error)
            setModal(true)
        }
    }


    return (
        <div className={classes.modalOverlay}>
            <div className={classes.container}>
                <button onClick={() => onCloseModal()} className={classes.closeBtn}>X</button>
                <div>
                    <form className={classes.form} >
                        {
                            oldResume ? <h2>Обновление резюме</h2> : <h2>Создание резюме</h2>
                        }
                        <p>Выберите должность</p>
                        <select onChange={(e) => setIdPosition(Number(e.target.value))}>
                            {positions.allPositions.map((position) => (
                                <option key={position.id} value={position.id}>
                                    {position.name}
                                </option>
                            ))}
                        </select>
                        <CustomInput type='text' placeholder='Укажите ваше образование' value={education}
                                     onChange={(e) => setEducation(e.target.value)}/>
                        <CustomInput type='text' placeholder='Укажите ваши навыки' value={skills}
                                     onChange={(e) => setSkills(e.target.value)}/>
                        <CustomInput type='text' placeholder='Укажите ваши места работы' value={experience}
                                     onChange={(e) => setExperience(e.target.value)}/>
                        <CustomInput type='text' placeholder='Укажите ваш город' value={city}
                                     onChange={(e) => setCity(e.target.value)}/>
                        <CustomInput type='text' placeholder='Укажите ссылки, удостоверяющие ваши навыки' value={links}
                                     onChange={(e) => setLinks(e.target.value)}/>
                        <CustomRedButton onClick={(event) => click(event)}>{oldResume ? 'Обновить резюме' : 'Создать резюме'}</CustomRedButton>

                    </form>
                    {modal && <ErrorModal message={error} onClose={() => setModal(false)}/>}
                </div>
            </div>
        </div>
    );
});

export default Resume;