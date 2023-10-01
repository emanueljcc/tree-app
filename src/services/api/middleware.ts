import {isRejectedWithValue} from '@reduxjs/toolkit';
import type {Middleware} from '@reduxjs/toolkit';
import Toast from 'react-native-toast-message';

export const rtkQueryErrorLogger: Middleware = () => next => action => {
	if (isRejectedWithValue(action)) {
		console.log('action => ', action);

		const errResponses = {
			status: action?.payload?.status || action?.payload.originalStatus,
			message:
				action?.payload?.data?.message ||
				action?.error.message ||
				action?.payload.error ||
				'An error has occurred 😥',
		};

		Toast.show({
			type: 'error',
			text1: 'Error',
			text2: errResponses.message,
		});
	}

	return next(action);
};
