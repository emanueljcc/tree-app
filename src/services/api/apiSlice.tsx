import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

import {Locales, ParentNode} from '@interfaces';
import {GetDataArgs} from './interfaces';

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
		getDataParent: builder.query<ParentNode[], GetDataArgs | null>({
			query: data => (data ? `/nodes?parent=${data.parent}` : '/nodes'),
		}),
		getNode: builder.query<ParentNode[], GetDataArgs | null>({
			query: data => `/node/${data?.parent}?locale=${data.locale}`,
		}),
		getLocales: builder.query<Locales[], void>({
			query: () => '/locales',
			transformResponse: (response: Locales[]) => {
				return response.map(res => ({
					label: res.label,
					value: res.locale,
				}));
			},
		}),

		// !POST ENDPOINTS
		// !DELETE ENDPOINTS
	}),
});

export const {
	useGetDataParentQuery,
	useLazyGetDataParentQuery,
	useLazyGetNodeQuery,
	useGetLocalesQuery,
} = apiSlice;
