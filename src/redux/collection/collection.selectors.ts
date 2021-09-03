import { createSelector } from "reselect";
import { RootState } from "../store";

const selectCollection = (state: RootState) => state.collection

export const selectCollections = createSelector([selectCollection], collection => collection.collections)