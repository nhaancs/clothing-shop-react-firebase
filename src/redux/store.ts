import { applyMiddleware, createStore, Middleware } from "redux";
import logger from 'redux-logger';
import { persistStore } from "redux-persist";
import thunk from "redux-thunk";
import rootReducer from "./root-reducer";

const middlewares: Middleware[] = [thunk]
if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger)
}


export const store = createStore(rootReducer, applyMiddleware(...middlewares))
export const persistor = persistStore(store)

export interface Action<T> {
    type: string
    payload?: T
}

// Infer the `RootState` and `AppDispatch` types from the store itself

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch