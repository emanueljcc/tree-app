import type {PayloadAction} from '@reduxjs/toolkit';
import {createSlice} from '@reduxjs/toolkit';

interface LocaleState {
	value: string;
}

const initialState: LocaleState = {
	value: 'es_ES',
};

const localeSlice = createSlice({
	name: 'locale',
	initialState,
	reducers: {
		setValue: (state, action: PayloadAction<string>) => {
			state.value = action.payload;
		},
	},
});

export const {setValue} = localeSlice.actions;

export default localeSlice.reducer;
