import {$authHost, $host} from "./index";




export const getTopVacancies = async() => {
    const {data} = await $host.get('api/vacancies/popular');
    return data
}

export const getMyVacancies = async() => {
    const {data} = await $authHost.get('api/vacancies/my-vacancies');
    return data
}

export const getAllVacancies = async({
                                         idBusyness,
                                         idCurrency,
                                         idWorkFormat,
                                         idWorkExperience,
                                         idPosition,
                                         page,
                                         limit = 10,
                                         idEmployee,
                                         name
                                     }) => {
    const {data} = await $host.get('api/vacancies/', {params: {
            idBusyness, idCurrency,idWorkFormat,idWorkExperience,idPosition,idEmployee, name,  page, limit
        }});
    return data
}

export const getById = async(id) => {
    const {data} = await $host.get(`api/vacancies/${id}`);
    return data
}

export const createVacancy = async(newData) => {
    const {data} = await $authHost.post('api/vacancies/', newData);
    return data
}

export const updateVacancy = async(id, newData) => {
    const {data} = await $authHost.put(`api/vacancies/${id}`, newData);
    return data
}

export const deleteVacancy = async(id) => {
    const {data} = await $authHost.delete(`api/vacancies/${id}`);
    return data
}

export const changeStatus = async(id) => {
    const {data} = await $authHost.put(`/api/vacancies/change-status/${id}`);
    return data
}

