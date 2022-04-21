import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {useEffect, useRef} from 'react';
import type {RootState, AppDispatch} from '../store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useDidUpdateEffect = (fn: () => void, inputs: unknown[]) => {
  const didMountRef = useRef(false);
  useEffect(() => {
    if (didMountRef.current) fn();
    else didMountRef.current = true;
  }, inputs);
};
