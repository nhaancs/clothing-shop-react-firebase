import { collection, CollectionReference, getDocs, query } from "@firebase/firestore";
import { Dispatch } from "redux";
import { convertCollectionsSnapshotToMap, firestore } from "../../firebase/firebase.utils";
import { Collection } from "../../models/collection.model";
import { Action } from "../store";

export type CollectionAction = Map<string, Collection>|string

export const COLLECTION_ACTION_FETCH_COLLECTIONS_START = "COLLECTION_ACTION_FETCH_COLLECTIONS_START";
export const fetchCollectionsStart = (): Action<CollectionAction> => ({
  type: COLLECTION_ACTION_FETCH_COLLECTIONS_START,
});

export const COLLECTION_ACTION_FETCH_COLLECTIONS_SUCCESS = "COLLECTION_ACTION_FETCH_COLLECTIONS_SUCCESS";
export const fetchCollectionsSuccess = (collectionsMap: Map<string, Collection>): Action<CollectionAction> => ({
  type: COLLECTION_ACTION_FETCH_COLLECTIONS_SUCCESS,
  payload: collectionsMap
});

export const COLLECTION_ACTION_FETCH_COLLECTIONS_FAILURE = "COLLECTION_ACTION_FETCH_COLLECTIONS_FAILURE";
export const fetchCollectionsFailure = (errorMessage: string): Action<CollectionAction> => ({
  type: COLLECTION_ACTION_FETCH_COLLECTIONS_FAILURE,
  payload: errorMessage
});

export const fetchCollectionsStartAsync = () => {
  return (dispatch: Dispatch) => {
    const collectionRef = collection(
      firestore,
      "collections"
    ) as CollectionReference<Collection>;

    dispatch(fetchCollectionsStart())
    getDocs( query(collectionRef))
      .then(querySnapshot => {
        const collectionsMap = convertCollectionsSnapshotToMap(querySnapshot);
        dispatch(fetchCollectionsSuccess(collectionsMap))
      })
      .catch(err => fetchCollectionsFailure(err?.message))
  }
}
