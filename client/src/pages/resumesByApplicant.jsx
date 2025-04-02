import React, {useContext, useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../main.jsx";
import {getMyResumes} from "../API/resumesAPI.js";
import ResumeCard from "../components/resumePage/resumeCard/resumeCard.jsx";
import classes from '../styles/resumesPage.module.css'
import CustomRedButton from "../components/UI/customRedButton/CustomRedButton.jsx";
import Resume from "../Modal/resume/resume.jsx";

const ResumesByApplicant = observer(() => {
    const {resumes} = useContext(Context);
    const [isCreate, setIsCreate] = React.useState(false);
    useEffect(() => {
        getMyResumes().then((data) => {resumes.setMyResumes(data)}); window.scrollTo(0, 0);
    }, [resumes, isCreate]);

    const resumesData = resumes.myResumes;
    return (
        <div className={classes.page}>

            <div>
                <h1>Мои резюме:</h1>
                <CustomRedButton onClick={() => setIsCreate(true)}>Добавить резюме</CustomRedButton>
            </div>
            <div>
            {resumesData?.length > 0 && resumesData.map((resume) => (
                    <ResumeCard key={resume.id} resume={resume} />
                ))}
            </div>
            {isCreate && <Resume onCloseModal={() => {setIsCreate(false)}}/>}
        </div>
    );
});

export default ResumesByApplicant;