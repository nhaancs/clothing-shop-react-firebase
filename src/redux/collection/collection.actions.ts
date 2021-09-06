import { Collection } from "../../models/collection.model";
import { Action } from "../store";

export const COLLECTION_ACTION_UPDATE_COLLECTIONS =
  "COLLECTION_ACTION_UPDATE_COLLECTIONS";
export const updateCollections = (collectionMap: {
  [key: string]: Collection;
}): Action<{ [key: string]: Collection }> => ({
  type: COLLECTION_ACTION_UPDATE_COLLECTIONS,
  payload: collectionMap,
});
