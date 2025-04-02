import {makeAutoObservable, observable} from "mobx";

export default class ApplicantStore {
    constructor() {
        this._profileApplicant = {}
        this._allApplicants = [];
        makeAutoObservable(this, {vacancies: observable, resumes: observable})
    }

    setApplicantProfile(profileApplicant) {
        this._profileApplicant = {
            ...profileApplicant,
            vacancies: observable(profileApplicant.vacancies || []),
        };
    }
    setAllApplicants(applicants) {
        this._allApplicants = applicants;
    }
    get ApplicantProfile(){
        return this._profileApplicant
    }

    get allApplicants(){
        return this._allApplicants;
    }
}