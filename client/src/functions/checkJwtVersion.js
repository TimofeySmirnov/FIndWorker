import { jwtDecode } from "jwt-decode";
import {checkApplicant} from "../API/applicantAPI.js";
import {checkEmployer} from "../API/employeeAPI.js";
import {checkAdmin} from "../API/adminAPI.js";



export default async function (token){
    if(!token){
        return false;
    }
    const decodedToken = jwtDecode(token);
    try {
        if(decodedToken.role === 'USER'){
            const resultCheck = await checkApplicant(decodedToken.id, decodedToken.jwtVersion);
            return resultCheck.status;
        }
        if(decodedToken.role === 'EMPLOYEE'){
            const resultCheck = await checkEmployer(decodedToken.id, decodedToken.jwtVersion);
            return resultCheck.status;
        }
        if(decodedToken.role === 'ADMIN'){
            const resultCheck = await checkAdmin(decodedToken.id, decodedToken.versionJwt);
            return resultCheck.status;
        }
    }catch(err){
        console.log(err.message);
    }

}