import {makeAutoObservable} from "mobx";

export default class RecallStore {
    constructor() {
        this._myRecalls = [];
        this._recallsByVacancy = [];
        makeAutoObservable(this)
    }

    setMyRecalls(myRecalls) {
        this._myRecalls = myRecalls;
    }
    setRecallsByVacancy(RecallsByVacancy) {
        this._recallsByVacancy = RecallsByVacancy;
    }

    get myRecalls() {
        return this._myRecalls;
    }
    get recallsByVacancy() {
        return this._recallsByVacancy;
    }
}