import { combineReducers } from "redux";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import cartReducer from "./cart/cart.reducer";
import collectionReducer from "./collection/collection.reducer";
import directoryReducer from "./directory/directory.reducer";
import userReducer from "./user/user.reducer";

const persistConfig = {
    key: 'root',
    storage: storage,
    whitelist: ['cart']
}

const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer,
    directory: directoryReducer,
    collection: collectionReducer,
})

export default persistReducer(persistConfig, rootReducer)