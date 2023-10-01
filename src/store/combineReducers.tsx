import {combineReducers} from '@reduxjs/toolkit';

// reducers
import localeReducer from './localeSlice';
import {apiSlice} from '../services/api/apiSlice';

const rootReducer = combineReducers({
	[apiSlice.reducerPath]: apiSlice.reducer,
	locale: localeReducer,
});

export default rootReducer;
