import {$host} from "./index.js";


export const getAllBusyness = async () => {
    try{
        const {data} = await $host.get('/api/filters/busyness')
        return data
    }catch(error){
        throw error;
    }
}

export const getAllCurrencies = async () => {
    try{
        const {data} = await $host.get('/api/filters/currencies')
        return data
    }catch(error){
        throw error;
    }
}

export const getAllWorkExperiences = async () => {
    try{
        const {data} = await $host.get('/api/filters/work-experiences')
        return data
    }catch(error){
        throw error;
    }
}

export const getAllWorkFormats = async () => {
    try{
        const {data} = await $host.get('/api/filters/work-formats')
        return data
    }catch(error){
        throw error;
    }
}