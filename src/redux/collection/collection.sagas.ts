import { collection, CollectionReference, getDocs, query, QuerySnapshot } from "@firebase/firestore";
import { takeLatest, call, put, all } from "redux-saga/effects";
import { convertCollectionsSnapshotToMap, firestore } from "../../firebase/firebase.utils";
import { Collection } from "../../models/collection.model";
import { COLLECTION_ACTION_FETCH_COLLECTIONS_START, fetchCollectionsFailureAction, fetchCollectionsSuccessAction } from "./collection.actions";

function* fetchCollections() {
  try {
    const collectionRef = collection(
      firestore,
      "collections"
    ) as CollectionReference<Collection>;
  
    const querySnapshot: QuerySnapshot<Collection> = yield getDocs(query(collectionRef))
    const collectionsMap: Map<string, Collection> = yield call(convertCollectionsSnapshotToMap, querySnapshot)
    yield put(fetchCollectionsSuccessAction(collectionsMap));
  } catch (err: any) {
    yield put(fetchCollectionsFailureAction(err?.message))
  }
}

export function* onFetchCollectionsStartSaga() {
  yield takeLatest(
    COLLECTION_ACTION_FETCH_COLLECTIONS_START,
    fetchCollections
  );
}

export function* collectionSagas() {
  yield(all([
    call(onFetchCollectionsStartSaga)
  ]))
}