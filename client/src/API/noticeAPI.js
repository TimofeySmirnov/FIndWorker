import {$authHost, $host} from "./index.js";

export const getNoticeApplicant = async () => {
    try{
        const {data} = await $authHost.get('api/notifications/applicant');
        return data
    }catch(err){
        throw err;
    }
}

export const getNoticeEmployee = async () => {
    try{
        const {data} = await $authHost.get('api/notifications/employee');
        return data
    }catch(err){
        throw err;
    }
}