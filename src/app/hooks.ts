import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import {
  createSearchParams,
  URLSearchParamsInit,
  useNavigate,
} from "react-router-dom";
import { useRef, useEffect, useCallback, useState } from "react";
import type { RootState, AppDispatch } from "./store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useNavigateSearch = () => {
  const navigate = useNavigate();
  return (pathname: string, params: URLSearchParamsInit | undefined) =>
    navigate({ pathname, search: `?${createSearchParams(params)}` });
};

export const useDebounceFunc = <F extends (...args: any) => any>(
  func: F,
  waitFor: number
): ((...args: Parameters<F>) => ReturnType<F>) => {
  const timer = useRef<NodeJS.Timer | null>();
  const savedFunc = useRef<F | null>(func);

  useEffect(() => {
    savedFunc.current = func;
  }, [func, waitFor]);

  return useCallback(
    (...args: any) => {
      if (timer.current) {
        clearTimeout(timer.current);
        timer.current = null;
      }

      timer.current = setTimeout(() => savedFunc.current?.(...args), waitFor);
    },
    [waitFor]
  ) as (...args: Parameters<F>) => ReturnType<F>;
};

export function useDebounceValue(value: string, delay: number): string {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
