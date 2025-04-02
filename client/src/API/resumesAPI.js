import {$authHost} from "./index.js";

export const getMyResumes = async () => {
    try{
        const {data} = await $authHost.get('/api/resume/my-resumes')
        return data
    }catch(error){
        throw error;
    }
}

export const getResumesById = async (idResume) => {
    try{
        const {data} = await $authHost.get(`api/resume/${idResume}`);
        return data
    }catch (error) {
        throw error;
    }
}

export const createResume = async (newData) => {
    try{
        const {data} = await $authHost.post(`api/resume/`, newData);
        return data
    }catch (error) {
        throw error;
    }
}

export const deleteResume = async (idResume) => {
    try{
        const {data} = await $authHost.delete(`api/resume/${idResume}`);
        return data
    }catch (error) {
        throw error;
    }
}

export const updateResume = async (idResume, newData) => {
    try{
        const {data} = await $authHost.put(`api/resume/${idResume}`, newData);
        return data
    }catch (error) {
        throw error;
    }
}