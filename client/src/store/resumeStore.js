import {makeAutoObservable, observable} from "mobx";

export default class ResumeStore {
    constructor() {
        this._resumeById = {}
        this._myResumes = []
        makeAutoObservable(this)
    }
    setResumeById(resumeById) {
        this._resumeById = resumeById

    }
    setMyResumes(myResumes) {
        this._myResumes = myResumes
    }

    get myResumes() {
        return this._myResumes;
    }
    get resumeById() {
        return this._resumeById;
    }
}