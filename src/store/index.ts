import {
  Action,
  configureStore,
  getDefaultMiddleware,
  ThunkAction
} from "@reduxjs/toolkit";
import rootReducer, { RootState } from "./root-reducer";

const middleware = getDefaultMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware
});

type AppDispatch = typeof store.dispatch;
type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export { AppDispatch, AppThunk };

export default store;
