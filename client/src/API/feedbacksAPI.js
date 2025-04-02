
import {$authHost, $host} from "./index.js";

export const getByIdEmployer = async (idEmployer) => {
    try{
        const {data} = await $host.get(`api/feedback/${idEmployer}`);
        return data;
    }catch(error){
        throw error;
    }
}

export const createFeedback = async (idEmployer, newData) => {
    try{
        const {data} = await $authHost.post(`api/feedback/${idEmployer}`, newData);
        return data;
    }catch(error){
        throw error;
    }
}

export const updateFeedback = async (idFeedback, newData) => {
    try{
        const {data} = await $authHost.put(`api/feedback/${idFeedback}`, newData);
        return data;
    }catch (error) {
        throw error;
    }
}

export const deleteFeedback = async (idFeedback) => {
    try{
        const {data} = await $authHost.delete(`api/feedback/${idFeedback}`);
        return data;
    }catch(error){
        throw error;
    }
}