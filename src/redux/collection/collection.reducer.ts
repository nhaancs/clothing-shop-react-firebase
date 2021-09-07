import { Collection } from "../../models/collection.model";
import { Action } from "../store";
import { CollectionAction, COLLECTION_ACTION_FETCH_COLLECTIONS_FAILURE, COLLECTION_ACTION_FETCH_COLLECTIONS_START, COLLECTION_ACTION_FETCH_COLLECTIONS_SUCCESS } from "./collection.actions";

interface CollectionState {
  collections: Map<string, Collection>;
  fetching: boolean;
  errorMessage: string;
}

const INITIAL_STATE: CollectionState = {
  collections: new Map<string, Collection>(),
  fetching: false,
  errorMessage: ''
};

const collectionReducer = (
  state = INITIAL_STATE,
  action: Action<CollectionAction>
): CollectionState => {
  switch (action.type) {
    case COLLECTION_ACTION_FETCH_COLLECTIONS_START:
      return {
        ...state,
        fetching: true
      };
    case COLLECTION_ACTION_FETCH_COLLECTIONS_SUCCESS:
      return {
        ...state,
        fetching: false,
        collections: action.payload as Map<string, Collection>,
      };
    case COLLECTION_ACTION_FETCH_COLLECTIONS_FAILURE:
      return {
        ...state,
        fetching: false,
        errorMessage: action.payload as string,
      };
    default:
      return state;
  }
};

export default collectionReducer;
