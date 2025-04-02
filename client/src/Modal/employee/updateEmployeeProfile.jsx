import React, {useState} from 'react';
import CustomInput from "../../components/UI/CustomInput/customInput.jsx";
import CustomTextarea from "../../components/UI/customTextarea/customTextarea.jsx";
import CustomRedButton from "../../components/UI/customRedButton/CustomRedButton.jsx";
import {updateEmployer} from "../../API/employeeAPI.js";
import classes from './updateEmployee.module.css'
import ErrorModal from "../modalForErrors/errorModal.jsx";


const UpdateEmployeeProfile = ({oldData, onClose, trigger}) => {
    const [name, setName] = useState(oldData?.name || '');
    const [description, setDescription] = useState(oldData?.description || '');
    const [address, setAddress] = useState(oldData?.address || '');
    const [phoneNumber, setPhoneNumber] = useState(oldData?.phoneNumber || '');
    const [img, setImg] = useState(oldData?.img || null);
    const [error, setError] = useState('');
    const [modal, setModal] = useState(false);

    const selectFile = e => {
        setImg(e.target.files[0])
    }

    const saveChange = async (e) => {
        e.preventDefault();
        try{
            const formData = new FormData();
            formData.append('name', name);
            formData.append('description', description);
            formData.append('address', address);
            formData.append('phoneNumber', phoneNumber);
            formData.append('newImg', img);
            const data = await updateEmployer(formData);
            console.log(data);
            trigger(prev => prev + 1);
            onClose()
        }catch(error){
            setError(error.response.data.error || error.response.data.message || 'Что то пошло не так');
            setModal(true);
        }
    }

    return (
        <div className={classes.modalOverlay}>
            <div className={classes.container}>
                <button onClick={() => onClose()} className={classes.closeBtn}>X</button>
                <form className={classes.form}>
                    <CustomInput type="text" placeholder='Введите название организации' value={name}
                                 onChange={(e) => setName(e.target.value)}/>
                    <CustomTextarea style={{width: '500px', height: '250px'}} type="text" placeholder='Введите описание организации' value={description}
                                    onChange={(e) => setDescription(e.target.value)}/>
                    <CustomInput type="text" placeholder='Введите адрес организации' value={address}
                                 onChange={(e) => setAddress(e.target.value)}/>
                    <CustomInput type="tel" placeholder='Введите номер телефона организации' value={phoneNumber}
                                 onChange={(e) => setPhoneNumber(e.target.value)}/>
                    <CustomInput type="file" placeholder='Прикрепите логотип организации' onChange={selectFile}/>
                    <CustomRedButton onClick={(event) => {
                        saveChange(event)
                    }}>Сохранить</CustomRedButton>
                </form>
                {modal && <ErrorModal message={error} onClose={() => setModal(false)}/>}
            </div>
        </div>
    );
};

export default UpdateEmployeeProfile;