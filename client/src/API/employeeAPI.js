import {$authHost, $host} from "./index.js";
import {jwtDecode} from "jwt-decode";
import {useContext} from "react";
import {Context} from "../main.jsx";


export const getAllEmployees = async(searchName) => {
    const {data} = await $host.get('api/employee/', {params: {searchName}});
    return data
}

export const getEmployeeById = async (id) => {
    const {data} = await $host.get(`api/employee/${id}`);
    return data
}

export const getPopularEmployees = async () => {
    const {data} = await $host.get('api/employee/popular');
    return data
}

export const registrationEmployee = async(newData) => {
    const { data } = await $host.post("api/employee/registration", newData);
    return jwtDecode(data.token)
}

export const loginEmployee = async (email, password) => {

    try {
        const { data } = await $host.post("api/employee/login", { email, password });
        localStorage.setItem("token", data.token);
        return jwtDecode(data.token)
    } catch (error) {
        throw error;
    }
}

export const updateEmployer = async (newData) => {
    try{
        const {data} = await $authHost.put(`api/employee/`, newData);
        return data;
    }
    catch (error) {
        throw error;
    }
}

export const checkEmployer = async (id, jwt) => {
    try{
        const {data} = await $host.post("api/employee/checkJwt", {id, jwt});
        return data
    }catch(error){
        throw error;
    }
}

export const changeEmployerPassword = async (oldPassword, newPassword) => {
    try{
        const {data} = await $authHost.put(`api/employee/change-password`, {oldPassword, newPassword});
        return data
    }catch(error) {
        throw error;
    }
}

export const changeEmployerEmail = async (newEmail, password) => {
    try{
        const {data} = await $authHost.put(`api/employee/change-email`, {newEmail, password});
        return data
    }catch(error) {
        throw error;
    }
}