import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { userApi } from "./Userapi";
import {agentApi  } from "./Agentapi";
import Userreducer from "./Userslice";
import Sidebarreducer from "./Sidebarslice";
import Conversationreducer from "./Singleconslice";

import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import createWebStorageImport from "redux-persist/lib/storage/createWebStorage";


const createWebStorage =
  (createWebStorageImport as unknown as { default?: typeof createWebStorageImport })
    .default ?? createWebStorageImport;

const storage = createWebStorage("local");

const userPersistConfig = {
  key: "user",
  version: 1,
  storage,
};

const conpersist={
  key:"conversation",
  version:1,
  storage
}

const sidepersist={
  key:"sidebar",
  version:1,
  storage
}

const persistedUserReducer = persistReducer(userPersistConfig, Userreducer);
const persistedconverstionreducer = persistReducer(conpersist, Conversationreducer);
const persistedsidebar = persistReducer(sidepersist, Sidebarreducer);

const rootReducer = combineReducers({
  [userApi.reducerPath]: userApi.reducer,
  [agentApi.reducerPath]:agentApi.reducer,
  user: persistedUserReducer,
  sidebar:persistedsidebar,
  conversation:persistedconverstionreducer
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(userApi.middleware,agentApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
