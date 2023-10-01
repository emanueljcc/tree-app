import {combineReducers} from '@reduxjs/toolkit';

// reducers
import counterReducer from './counterSlice';
import {apiSlice} from '../services/api/apiSlice';

const rootReducer = combineReducers({
	[apiSlice.reducerPath]: apiSlice.reducer,
	counter: counterReducer, // example
});

export default rootReducer;
