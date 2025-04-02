import {makeAutoObservable} from "mobx";

export default class  NotificationStore{
    constructor(){
        this._myNotifications = []
        makeAutoObservable(this)
    }

    setMyNotifications(notifications){
        this._myNotifications = notifications
    }

    get myNotifications(){
        return this._myNotifications
    }

    clearMyNotifications(){
        this._myNotifications = []
    }
}