import { combineReducers, configureStore } from "@reduxjs/toolkit";
import flightSearchReducer from "./flightSearch/flightSearchSlice";
import seatMapReducer from "./flightSearch/seatMapSlice";
import { flightSearchApi } from "./flightSearch/flightSearchService";
import logger from "redux-logger";

const rootReducer = combineReducers({
  flightSearch: flightSearchReducer,
  seatMap: seatMapReducer,
  [flightSearchApi.reducerPath]: flightSearchApi.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }).concat(flightSearchApi.middleware).concat(logger),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
