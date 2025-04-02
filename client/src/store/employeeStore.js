import {makeAutoObservable} from "mobx";

export default class EmployeeStore {
    constructor() {
        this._topEmployees = [];
        this._employeeById = {};
        this._allEmployees = [];
        this._searchAllEmployees = [];
        this._page = 1;
        this._limit = 10;
        this._totalCount = 0;
        this._searchName = {}
        makeAutoObservable(this)
    }
    setPage(page) {
        this._page = page;
    }
    setLimit(limit) {
        this._limit = limit;
    }
    setTotalCount(totalCount) {
        this._totalCount = totalCount;
    }
    setSearchName(name) {
        this.setPage(1)
        this._searchName = name;
    }
    setEmployeeById(employeeById) {
        this._employeeById = employeeById;
    }
    setAllEmployees(allEmployees) {
        this._allEmployees = allEmployees;
    }
    setTopEmployees(topEmployees) {
        this._topEmployees = topEmployees;
    }

    setSearchAllEmployees(searchAllEmployees) {
        this._searchAllEmployees = searchAllEmployees;
    }

    get searchAllEmployees() {
        return this._searchAllEmployees;
    }
    get topEmployees() {
        return this._topEmployees;
    }
    get allEmployees() {
        return this._allEmployees;
    }
    get employeeById() {
        return this._employeeById;
    }
    get searchName() {
        return this._searchName;
    }
    get page() {
        return this._page;
    }
    get limit() {
        return this._limit;
    }
    get totalCount() {
        return this._totalCount;
    }
}