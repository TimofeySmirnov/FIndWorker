import {makeAutoObservable} from "mobx";

export default class FeedbackStore {

    constructor() {
        this._feedbacksByEmployer = []
        makeAutoObservable(this)
    }

    setFeedbacksByEmployer(feedbacksByEmployer) {
        this._feedbacksByEmployer = feedbacksByEmployer;
    }
    get feedbacksByEmployer() {
        return this._feedbacksByEmployer;
    }

    clearFeedbacksByEmployer() {
        this._feedbacksByEmployer = [];
    }
}