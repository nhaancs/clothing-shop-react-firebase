import { createSelector } from "reselect";
import { RootState } from "../store";


const selectCollection = (state: RootState) => state.collection

export const selectCollections = createSelector([selectCollection], collection => Object.values(collection.collections))

export const selectOneCollection = (collectionSlug: string) => 
    createSelector(
        [selectCollection], 
        collection => collection.collections[collectionSlug]
    )