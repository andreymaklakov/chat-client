import { combineReducers, configureStore } from "@reduxjs/toolkit";

import chatReducer from "./chat";

const rootReducer = combineReducers({
  chat: chatReducer,
});

function store() {
  return configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== "production",
  });
}

export default store;
