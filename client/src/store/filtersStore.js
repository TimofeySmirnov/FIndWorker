import {makeAutoObservable} from "mobx";

export default class FiltersStore {
    constructor () {
        this._busyness = []
        this._currencies = []
        this._workExperiences = []
        this._workFormats= []
        makeAutoObservable(this)
    }

    setBusyness (busyness) {
        this._busyness = busyness
    }
    setCurrencies (currencies) {
        this._currencies = currencies
    }
    setWorkExperiences (workExperiences) {
        this._workExperiences = workExperiences
    }
    setWorkFormats (workFormats) {
        this._workFormats = workFormats
    }

    get allBusyness () {
        return this._busyness
    }

    get allCurrencies () {
        return this._currencies
    }

    get allWorkFormats () {
        return this._workFormats
    }
    get allWorkExperiences () {
        return this._workExperiences
    }
}