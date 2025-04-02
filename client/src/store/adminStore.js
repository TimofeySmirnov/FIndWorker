import {makeAutoObservable} from "mobx";

export default class AdminStore {
    constructor() {
        this._applicants = []
        this._moderationVacancies = []
        makeAutoObservable(this)
    }

    setModerationVacancies(newModerationVacancies) {
        this._moderationVacancies = newModerationVacancies
    }

    setApplicants(newApplicants) {
        this._applicants = newApplicants
    }

    get moderationVacancies() {
        return this._moderationVacancies
    }

    get applicants() {
        return this._applicants
    }

}