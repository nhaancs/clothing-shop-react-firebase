import { all, call, put, takeLatest } from "@redux-saga/core/effects";
import { USER_ACTION_SIGN_OUT_SUCCESS } from "../user/user.actions";
import { clearCartAction } from "./cart.actions";

function* clearCart() {
    yield put(clearCartAction())
}

export function* onSignOutSuccessSaga() {
    yield takeLatest(USER_ACTION_SIGN_OUT_SUCCESS, clearCart)
}

export function* cartSagas() {
    yield(all([
        call(onSignOutSuccessSaga)
    ]))
}