// import { configureStore } from '@reduxjs/toolkit';
// import reducer from './rootreducer';

// export default function () {
//   return configureStore({ reducer });
// }

import { configureStore } from "@reduxjs/toolkit";
import { appReduxSlice } from "./globalStore";

export const store = configureStore({
    reducer: {
        app_reducer: appReduxSlice.reducer,
    },
});
