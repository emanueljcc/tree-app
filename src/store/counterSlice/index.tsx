import type {PayloadAction} from '@reduxjs/toolkit';
import {createSlice} from '@reduxjs/toolkit';

interface CounterState {
	value: number;
}

const initialState: CounterState = {
	value: 0,
};

const counterSlice = createSlice({
	name: 'counter',
	initialState,
	reducers: {
		increment: state => {
			state.value++;
		},
		decrement: state => {
			state.value--;
		},
		// <number> es el tipo dato de value
		incrementByAmount: (state, action: PayloadAction<number>) => {
			state.value += action.payload;
		},
		decrementByAmount: (state, action: PayloadAction<number>) => {
			state.value -= action.payload;
		},
		reset: state => {
			state.value = 0;
		},
	},
});

export const {
	increment,
	decrement,
	incrementByAmount,
	decrementByAmount,
	reset,
} = counterSlice.actions;

export default counterSlice.reducer;
