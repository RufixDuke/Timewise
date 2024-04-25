import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import AuthSlice from "./AuthSlice";
import AlarmSlice from "./AlarmSlice";
import TaskSlice from "./TaskSlice";
import SleepTargetSlice from "./SleepTargetSlice";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["isAuth", "alarms", "tasks", "sleep"],
};

const rootReducer = combineReducers({
  isAuth: AuthSlice,
  alarms: AlarmSlice,
  tasks: TaskSlice,
  sleep: SleepTargetSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export default store;
