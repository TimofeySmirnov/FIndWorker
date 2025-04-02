import {makeAutoObservable, observable} from "mobx";

export default class PositionStore{
    constructor(){
        this._positions = [];
        this._positionById = {}
        this._allPositions = [];
        makeAutoObservable(this)
    }
    setPositions(positions){
        this._positions = positions;
    }
    setPositionById(positionById){
        this._positionById = positionById;
    }
    setAllPositions(positions){
        this._allPositions = positions;
    }

    get topPositions(){
        return this._positions;
    }

    get positionById(){
        return this._positionById;
    }
    get allPositions(){
        return this._allPositions;
    }
}