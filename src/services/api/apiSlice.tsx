import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

import {Locales, ParentNode} from '@interfaces';
import {GetDataArgs, SaveDataArgs} from './interfaces';

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
	tagTypes: ['ParentNode', 'Node'],
	endpoints: builder => ({
		// !GET ENDPOINTS
		getDataParent: builder.query<ParentNode[], GetDataArgs | null>({
			query: data => (data ? `/nodes?parent=${data.parent}` : '/nodes'),
			providesTags: ['ParentNode'],
		}),
		getNode: builder.query<ParentNode[], GetDataArgs | null>({
			query: data => `/node/${data?.parent}?locale=${data.locale}`,
			providesTags: ['Node'],
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
		saveNode: builder.mutation<ParentNode, SaveDataArgs>({
			query: data => ({
				url: '/node',
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['Node', 'ParentNode'],
		}),

		// !DELETE ENDPOINTS
		deleteNode: builder.mutation({
			query: (id: number) => ({
				url: `/node/${id}`,
				method: 'DELETE',
			}),
		}),
	}),
});

export const {
	// get
	useGetDataParentQuery,
	useLazyGetDataParentQuery,
	useLazyGetNodeQuery,
	useGetLocalesQuery,

	// post
	useSaveNodeMutation,

	// delete
	useDeleteNodeMutation,
} = apiSlice;
