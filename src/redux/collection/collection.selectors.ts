import { createSelector } from "reselect";
import { RootState } from "../store";


const selectCollection = (state: RootState) => state.collection

export const selectCollections = createSelector([selectCollection], collection => Array.from(collection.collections.values()))

export const selectOneCollection = (collectionSlug: string) => 
    createSelector(
        [selectCollection], 
        collection => collection.collections.get(collectionSlug)
    )

export const selectCollectionFetching = createSelector(
    [selectCollection],
    collection => collection.fetching
)