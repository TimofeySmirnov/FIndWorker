import {$host} from "./index.js";

export const getPositions = async() => {
    const {data} = await $host.get('api/position/popular');
    return data
};

export const getPositionById = async(id) => {
    try{
        const {data} = await $host.get(`api/position/${id}`);
        return data;
    }catch(error){
        throw error;
    }
}

export const getALlPosition = async() => {
    try{
        const {data} = await $host.get('api/position/');
        return data;
    }catch(error){
        throw error;
    }
}