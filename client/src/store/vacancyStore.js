import { makeAutoObservable } from "mobx";

export default class VacancyStore {
    constructor() {
        this._topVacancies = [];
        this._allVacancies = [];
        this._vacancyById = {};
        this._myVacancies = [];
        this._page = 1;
        this._limit = 10;
        this._totalCount = 0;
        this._moderationVacancies = [];


        makeAutoObservable(this);
    }

    // Методы установки значений
    setModerationVacancies(moderationVacancies) {
        this._moderationVacancies = moderationVacancies;
    }


    setPage(page) {
        this._page = page;
    }
    setMyVacancies(myVacancies) {
        this._myVacancies = myVacancies;
    }
    setLimit(limit) {
        this._limit = limit;
    }
    setTotalCount(totalCount) {
        this._totalCount = totalCount;
    }

    setBusyness(busyness) {
        this._busyness = busyness;
    }
    setCurrency(currency) {
        this._currency = currency;
    }
    setWorkFormat(workFormat) {
        this._workFormat = workFormat;
    }
    setEmployee(employee) {
        this._employee = employee;
    }
    setWorkExperience(workExperience) {
        this._workExperience = workExperience;
    }
    setPosition(position) {
        this._position = position;
    }
    setTopVacancies(topVacancies) {
        this._topVacancies = topVacancies;
    }
    setAllVacancies(allVacancies) {
        this._allVacancies = allVacancies;
    }
    setVacancyById(vacancyById) {
        this._vacancyById = vacancyById;
    }

    // Установка фильтров


    // Геттеры

    get myVacancies() {
        return this._myVacancies;
    }
    get moderationVacancies() {
        return this._moderationVacancies;
    }
    get allVacancies() {
        return this._allVacancies;
    }
    get vacancyById() {
        return this._vacancyById;
    }
    get topVacancies() {
        return this._topVacancies;
    }
    get employee() {
        return this._employee;
    }
    get busyness() {
        return this._busyness;
    }
    get currency() {
        return this._currency;
    }
    get workFormat() {
        return this._workFormat;
    }
    get workExperience() {
        return this._workExperience;
    }
    get position() {
        return this._position;
    }
    get page() {
        return this._page;
    }

}
