import { createStore, applyMiddleware } from "redux";
import logger from 'redux-logger'
import rootReducer from "./root-reducer";

const middlewares = [logger]

const store = createStore(rootReducer, applyMiddleware(...middlewares))

export interface Action<T> {
    type: string
    payload?: T
}

export default store