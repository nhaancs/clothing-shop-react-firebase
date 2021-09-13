import createSagaMiddleware from "@redux-saga/core";
import { applyMiddleware, createStore, Middleware } from "redux";
import logger from 'redux-logger';
import { persistStore } from "redux-persist";
import rootReducer from "./root-reducer";
import rootSaga from "./root-saga";

const sagaMiddleware = createSagaMiddleware()

const middlewares: Middleware[] = [sagaMiddleware]
if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger)
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares))

sagaMiddleware.run(rootSaga)

export const persistor = persistStore(store)

export interface Action<T> {
    type: string
    payload?: T
}

// Infer the `RootState` and `AppDispatch` types from the store itself

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch