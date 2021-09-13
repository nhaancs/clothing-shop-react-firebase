import { all, call } from "@redux-saga/core/effects";
import { fetchCollectionsStartSaga } from "./collection/collection.sagas";
import { userSagas } from "./user/user.sagas";

export default function* rootSaga() {
    yield all([
        call(fetchCollectionsStartSaga),
        call(userSagas),
    ])
}