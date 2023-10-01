import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

// TODO: create .env?
const API_URL = 'https://api-graph.tests.grupoapok.com/api';

export const apiSlice = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({
		baseUrl: API_URL,
		prepareHeaders: async (headers, {}) => {
			headers.set('Content-type', 'application/json');
			return headers;
		},
		timeout: 15000,
	}),
	tagTypes: [''],
	endpoints: builder => ({
		// !GET ENDPOINTS
		getParents: builder.query<any, void>({
			query: () => '/nodes',
		}),

		// !POST ENDPOINTS
		// !DELETE ENDPOINTS
	}),
});

export const {useGetParentsQuery} = apiSlice;
