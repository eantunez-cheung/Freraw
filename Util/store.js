import { createStore } from "redux"
import { persistReducer, persistStore } from "redux-persist"
import AsyncStorage from '@react-native-async-storage/async-storage'
import reducer from "./reducer"

const persistConfig = {
    key: 'root',
    storage: AsyncStorage
}

const persistedReducer = persistReducer(persistConfig, reducer)

export let store = createStore(persistedReducer)
export let persistor = persistStore(store)