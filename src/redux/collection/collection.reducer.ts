import { Collection } from "../../models/collection.model";
import { Action } from "../store";
import { COLLECTION_ACTION_UPDATE_COLLECTIONS } from "./collection.actions";

interface CollectionState {
  collections: { [key: string]: Collection };
}

const INITIAL_STATE: CollectionState = {
  collections: {},
};

const collectionReducer = (
  state = INITIAL_STATE,
  action: Action<{ [key: string]: Collection }>
): CollectionState => {
  switch (action.type) {
    case COLLECTION_ACTION_UPDATE_COLLECTIONS:
      return {
        ...state,
        collections: action.payload as { [key: string]: Collection }
      }
    default:
      return state;
  }
};

export default collectionReducer;
