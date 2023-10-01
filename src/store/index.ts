import {configureStore} from '@reduxjs/toolkit';

// redux persist library
import {persistStore, persistReducer} from 'redux-persist';

import AsyncStorage from '@react-native-async-storage/async-storage';

// reducers
import rootReducer from './combineReducers';
import {apiSlice} from '../services/api/apiSlice';
import {rtkQueryErrorLogger} from '../services/api/middleware';

const rootPersistConfig = {
	timeout: 1000,
	key: 'root',
	version: 1,
	storage: AsyncStorage,
	// only persist states reducers
	whitelist: ['locale'],
};

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			immutableCheck: false,
			serializableCheck: false,
		}).concat(apiSlice.middleware, rtkQueryErrorLogger),
});

export const persistor = persistStore(store);

// type store
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
