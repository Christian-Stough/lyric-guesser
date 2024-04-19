import { useDispatch, useSelector, useStore } from "react-redux";
import type { AppDispatch, AppStore, RootState } from "./store";
import { decreaseTimer, setScoring } from "./features/logic/logicSlice";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();

export const useStartTimer = (dispatch: AppDispatch) => {
  const interval = setInterval(() => {
    dispatch(decreaseTimer());
  }, 1000);

  return interval;
};

export const useStopTimer = (timer: string) => {
  clearInterval(timer);
};
