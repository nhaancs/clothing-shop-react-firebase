import { createSelector } from "reselect";
import { RootState } from "../store";

const COLLECTION_ID_MAP: {[key: string]: number} = {
    hats: 1,
    sneakers: 2, 
    jackets: 3,
    womens: 4,
    mens: 5,
}

const selectCollection = (state: RootState) => state.collection

export const selectCollections = createSelector([selectCollection], collection => collection.collections)

export const selectOneCollection = (collectionSlug: string) => 
    createSelector(
        [selectCollections], 
        collections => collections.find(c => c.id === COLLECTION_ID_MAP[collectionSlug])
    )