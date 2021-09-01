import { createStore, applyMiddleware } from "redux";
import logger from 'redux-logger'
import rootReducer from "./root-reducer";

const middlewares = [logger]

const store = createStore(rootReducer, applyMiddleware(...middlewares))

export interface Action<T> {
    type: string
    payload?: T
}

// Infer the `RootState` and `AppDispatch` types from the store itself

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store