import { all, call } from "@redux-saga/core/effects";
import { cartSagas } from "./cart/cart.sagas";
import { collectionSagas } from "./collection/collection.sagas";
import { userSagas } from "./user/user.sagas";

export default function* rootSaga() {
    yield all([
        call(collectionSagas),
        call(userSagas),
        call(cartSagas),
    ])
}