import { configureStore } from "@reduxjs/toolkit";
import { composeWithDevTools } from "@redux-devtools/extension";
import apiSlice from "./api/api.slice";
import { defaultSerializeQueryArgs } from "@reduxjs/toolkit/dist/query";
const composedObj = composeWithDevTools();
const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: getDefault => getDefault().concat(apiSlice.middleware)
});
export default store;