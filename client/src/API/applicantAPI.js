import {$authHost, $host} from "./index.js";
import {useContext} from "react";
import {Context} from "../main.jsx";
import {jwtDecode} from "jwt-decode";



export const loginApplicant = async (email, password) => {
    try {
        const { data } = await $host.post("api/applicant/login", {email, password});
        localStorage.setItem("token", data.token);
        return jwtDecode(data.token)
    } catch (error) {
        throw error;
    }
}


export const registrationApplicant = async (newData) => {
    try{
        const { data } = await $host.post("api/applicant/registration", newData);
        localStorage.setItem("token", data.token);
        return jwtDecode(data.token)
    }catch(error){
        throw error;
    }
}

export const getMe = async () => {
    try{
        const {data} = await $authHost.get("api/applicant/me");
        return data
    }
    catch(error) {
        throw error;
    }
}

export const getById = async (id) => {
    try{
        const {data} = await $authHost.get(`api/applicant/${id}`);
        return data
    }catch(error) {
        throw error;
    }
}

export const changePassword = async (oldPassword, newPassword) => {
    try{
        const {data} = await $authHost.put(`api/applicant/change-password`, {oldPassword, newPassword});
        return data
    }catch(error) {
        throw error;
    }
}

export const changeEmail = async (newEmail, password) => {
    try{
        const {data} = await $authHost.put(`api/applicant/change-email`, {newEmail, password});
        return data
    }catch(error) {
        throw error;
    }
}

export const updateApplicant = async (newData) => {
    try{
        const {data} = await $authHost.put(`api/applicant/`, newData);
        return data
    }catch (error) {
        throw error;
    }
}

export const checkApplicant = async (id, jwt) => {
    try{
        console.log('startAPICheck')
        const {data} = await $host.post("api/applicant/checkJwt", {id, jwt});
        console.log('checkedAPI')
        return data
    }catch(error){
        throw error;
    }
}