import {isRejectedWithValue} from '@reduxjs/toolkit';
import type {Middleware} from '@reduxjs/toolkit';
import Toast from 'react-native-toast-message';

export const rtkQueryErrorLogger: Middleware = () => next => action => {
	if (isRejectedWithValue(action)) {
		const errResponses = {
			status: action?.payload?.status || 500,
			message: 'An error has occurred 😥',
		};

		Toast.show({
			type: 'error',
			text1: 'Error',
			text2: errResponses.message,
		});
	}

	return next(action);
};
