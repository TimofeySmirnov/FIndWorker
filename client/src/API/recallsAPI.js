import {$authHost} from "./index.js";


export const getMyRecalls = async () => {
    try{
        const {data} = await $authHost.get('api/recalls/my-recalls');
        return data;
    }catch (error) {
        throw error;
    }
}

export const getMyRecallsByVacancy = async (vacancyId) => {
    try{
        const {data} = await $authHost.get(`api/recalls/recallsApplicants/${vacancyId}`);
        return data
    }catch (error) {
        throw error;
    }
}

export const recallToVacancy = async (vacancyId, idResume) => {
    try{

        const {data} = await $authHost.post(`api/recalls/apply/${vacancyId}`, {idResume});
        return data
    }catch (error) {
        throw error;
    }
}

export const approveRecall = async (idRecall) => {
    try{
        const {data} = await $authHost.put(`api/recalls/allow-recall/${idRecall}`);
        return data
    }catch (error) {
        throw error;
    }
}

export const rejectRecall = async (idRecall) => {
    try{
        const {data} = await $authHost.put(`api/recalls/reject-recall/${idRecall}`);
        return data
    }catch (error) {
        throw error;
    }
}