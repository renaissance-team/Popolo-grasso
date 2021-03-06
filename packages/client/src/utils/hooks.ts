import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {
  useEffect, useRef, RefObject, useMemo
} from 'react';
import {EThemes} from '@/store/theme/reducer';
import classNames from 'classnames';
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

export function useOnClickOutside(ref: RefObject<Element>, handler: (event: Event) => void) {
  useEffect(() => {
    const listener = (event: Event) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}

export function useTheme(styles: any, className: string) {
  const {theme} = useAppSelector((state) => state.theme);
  const classes = useMemo(() => classNames([styles[className], theme === EThemes.dark && styles.dark]), [theme]);
  return classes;
}
