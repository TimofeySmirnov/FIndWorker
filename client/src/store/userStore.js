import {makeAutoObservable} from "mobx";
import {jwtDecode} from "jwt-decode";
import checkJwtVersion from "../functions/checkJwtVersion.js";

export default class UserStore {
    constructor() {
        this._isAuth = false
        this._user = null
        this._role = ''
        this._entry = 'APPLICANT'
        makeAutoObservable(this, {}, { autoBind: true });
    }

    setIsAuth(bool) {
        this._isAuth = bool
    }
    setUser(user) {
        this._user = user
    }
    setRole(role) {
        this._role = role
    }
    setEntry(entry) {
        this._entry = entry
    }
    get entry() {
        return this._entry
    }
    get isAuth() {
        return this._isAuth
    }
    get user() {
        return this._user
    }
    get role() {
        return this._role
    }

    setDefault(){
        this.setIsAuth(false)
        this.setUser(null)
        this.setRole('')
        this.setEntry('APPLICANT')
        localStorage.removeItem('token')
    }

    async checkToken(){

        const token = localStorage.getItem("token");

        if(!token){
            this.setDefault()
            return
        }
        const decoded = jwtDecode(token);

        const resultCheck = await checkJwtVersion(token)

        if(!resultCheck){
            this.setDefault()
            return
        }

        if(decoded.role === "EMPLOYEE") {

                this.setIsAuth(true)
            this.setRole(decoded.role)
            this.setUser(decoded.id)
            return

        }
        if(decoded.role === "USER") {

            this.setIsAuth(true)
            this.setRole(decoded.role)
            this.setUser(decoded.id)

        }
        if(decoded.role === "ADMIN") {

            this.setIsAuth(true)
            this.setRole(decoded.role)
            this.setUser(decoded.id)

        }
    }
}