import { Collection } from "../../models/collection.model";
import { Action } from "../store";

export type CollectionAction = Map<string, Collection>|string

export const COLLECTION_ACTION_FETCH_COLLECTIONS_START = "COLLECTION_ACTION_FETCH_COLLECTIONS_START";
export const fetchCollectionsStartAction = (): Action<CollectionAction> => ({
  type: COLLECTION_ACTION_FETCH_COLLECTIONS_START,
});

export const COLLECTION_ACTION_FETCH_COLLECTIONS_SUCCESS = "COLLECTION_ACTION_FETCH_COLLECTIONS_SUCCESS";
export const fetchCollectionsSuccessAction = (collectionsMap: Map<string, Collection>): Action<CollectionAction> => ({
  type: COLLECTION_ACTION_FETCH_COLLECTIONS_SUCCESS,
  payload: collectionsMap
});

export const COLLECTION_ACTION_FETCH_COLLECTIONS_FAILURE = "COLLECTION_ACTION_FETCH_COLLECTIONS_FAILURE";
export const fetchCollectionsFailureAction = (errorMessage: string): Action<CollectionAction> => ({
  type: COLLECTION_ACTION_FETCH_COLLECTIONS_FAILURE,
  payload: errorMessage
});
