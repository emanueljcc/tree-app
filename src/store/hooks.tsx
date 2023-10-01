// para manejar los types de useDispatch y useSelector q es TS

import type {TypedUseSelectorHook} from 'react-redux';
import {useDispatch, useSelector} from 'react-redux';
import type {RootState, AppDispatch} from '.';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
