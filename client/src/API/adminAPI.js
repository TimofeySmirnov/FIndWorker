import {$authHost, $host} from "./index.js";
import {jwtDecode} from "jwt-decode";

export const loginAdmin = async (login, password, secretKey) => {
    try {
        const { data } = await $host.post("api/admin/login", {login, password, secretKey});
        localStorage.setItem("token", data.token);
        return jwtDecode(data.token)
    } catch (error) {
        throw error;
    }
}

export const registrationAdmin = async (login, password, secretKey) => {
    try{
        const { data } = await $host.post("api/admin/create", {login, password, secretKey});
        localStorage.setItem("token", data.token);
        return jwtDecode(data.token)
    }catch(error){
        throw error;
    }
}

export const checkAdmin = async (id, jwt) => {
    try{
        const {data} = await $host.post("api/admin/checkJwt", {id, jwt});

        return data
    }catch(error){
        throw error;
    }
}


export const getAllApplicants = async () => {
    try{
        const {data} = await $authHost.get('/api/admin/applicants')
        return data
    }catch(error){
        throw error;
    }
}

export const getModerationVacancies = async () => {
    try{
        const {data} = await $authHost.get('/api/admin/moderationVacancies')
        return data
    }catch(error){
        throw error;
    }
}

export const deleteApplicant = async (id) => {
    try{
        const {data} = await $authHost.delete(`/api/admin/applicant/${id}`)
        return data
    }catch(error){
        throw error;
    }
}

export const deleteEmployer = async (id) => {
    try{
        const {data} = await $authHost.delete(`/api/admin/employee/${id}`)
        return data
    }catch(error){
        throw error;
    }
}

export const deleteVacancy = async (id) => {
    try{
        const {data} = await $authHost.delete(`/api/admin/vacancy/${id}`)
        return data
    }catch(error){
        throw error;
    }
}

export const deleteResume = async (id) => {
    try{
        const {data} = await $authHost.delete(`/api/admin/resume/${id}`)
        return data
    }catch(error){
        throw error;
    }
}

export const deleteRecall = async (id) => {
    try{
        const {data} = await $authHost.delete(`/api/admin/recall/${id}`)
        return data
    }catch(error){
        throw error;
    }
}

export const deleteFeedback = async (id) => {
    try{
        const {data} = await $authHost.get(`/api/admin/feedback/${id}`)
        return data
    }catch(error){
        throw error;
    }
}

export const createBusyness = async (nameBusyness) => {
    try{
        const {data} = await $authHost.post(`/api/admin/busyness`, {nameBusyness})
        return data
    }catch(error){
        throw error;
    }
}

export const createCurrency = async (currency, symbol) => {
    try{
        const {data} = await $authHost.post(`/api/admin/currencies`, {currency, symbol})
        return data
    }catch(error){
        throw error;
    }
}

export const createWorkExperience = async (name) => {
    try{
        const {data} = await $authHost.post(`/api/admin/work-experience`, {name})
        return data
    }catch(error){
        throw error;
    }
}

export const createWorkFormat = async (name) => {
    try{
        const {data} = await $authHost.post(`/api/admin/work-format`, {name})
        return data
    }catch(error){
        throw error;
    }
}

export const createPosition = async (name, description) => {
    try{
        const {data} = await $authHost.post(`/api/admin/position`, {name, description})
        return data
    }catch(error){
        throw error;
    }
}

export const updatePosition = async (id, newData) => {
    try{
        const {data} = await $authHost.put(`/api/admin/position/${id}`, newData)
        return data
    }catch(error){
        throw error;
    }
}

export const updateWorkFormat = async (id, name) => {
    try{
        const {data} = await $authHost.put(`/api/admin/work-format/${id}`, {name})
        return data
    }catch(error){
        throw error;
    }
}

export const updateWorkExperience = async (id, name) => {
    try{
        const {data} = await $authHost.put(`/api/admin/work-experience/${id}`, {name})
        return data
    }catch(error){
        throw error;
    }
}

export const updateCurrency = async (id, newData) => {
    try{
        const {data} = await $authHost.put(`/api/admin/currencies/${id}`, newData)
        return data
    }catch(error){
        throw error;
    }
}

export const updateBusyness = async (id, nameBusyness) => {
    try{
        const {data} = await $authHost.put(`/api/admin/busyness${id}`, {nameBusyness})
        return data
    }catch(error){
        throw error;
    }
}

export const deleteBusyness = async (id) => {
    try{
        const {data} = await $authHost.delete(`/api/admin/busyness/${id}`)
        return data
    }catch (error){
        throw error;
    }
}

export const deleteCurrency = async (id) => {
    try{
        const {data} = await $authHost.delete(`/api/admin/currencies/${id}`)
        return data
    }catch (error){
        throw error;
    }
}

export const deleteWorkExperience = async (id) => {
    try{
        const {data} = await $authHost.delete(`/api/admin/work-experience/${id}`)
        return data
    }catch (error){
        throw error;
    }
}

export const deleteWorkFormat = async (id) => {
    try{
        const {data} = await $authHost.delete(`/api/admin/work-format/${id}`)
        return data
    }catch (error){
        throw error;
    }
}

export const deletePosition = async (id) => {
    try{
        const {data} = await $authHost.delete(`/api/admin/position/${id}`)
        return data
    }catch (error){
        throw error;
    }
}

export const applyVacancy = async (id) => {
    try{
        const {data} = await $authHost.put(`/api/admin/approve-vacancy/${id}`)
        return data
    }catch (error){
        throw error;
    }
}

export const rejectVacancy = async (id) => {
    try{
        const {data} = await $authHost.put(`/api/admin/reject-vacancy/${id}`)
        return data
    }catch (error){
        throw error;
    }
}