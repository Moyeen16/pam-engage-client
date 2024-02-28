// import { createSlice } from "@reduxjs/toolkit";

// const GlobalStore = createSlice({
//     name: "Global",
//     initialState: {
//         userData: [],
//         teamName: null,
//         score: 0,
//         timeElapsed: 0,
//     },

//     reducers: {
//         //actions
//         setTeamName: (Data, action) => {
//             Data.teamName = action.payload;
//         },
//         setReduxScore: (Data, action) => {
//             Data.score = action.payload;
//         },
//         setTimeElaspsed: (Data, action) => {
//             Data.timeElapsed = action.payload;
//         },
//     },
// });

// export const { setTeamName, setReduxScore, setTimeElaspsed } =
//     GlobalStore.actions;

// // export default GlobalStore.reducer;
// export const GlobalStore = (state) => state.reducer;

// export const getTeamName = (state) => state.GlobalStore.teamName;
// export const getTimeElapsed = (state) => state.GlobalStore.timeElapsed;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    userData: [],
    teamName: null,
    score: 0,
    timeElapsed: 0,
    recordedTime: 0,
};

export const appReduxSlice = createSlice({
    name: "appSlice",
    initialState,
    reducers: {
        setTeamName: (state, action) => {
            state.teamName = action.payload;
        },
        setReduxScore: (state, action) => {
            state.score = action.payload;
        },
        incrementTimeElapsed: (state, action) => {
            state.timeElapsed += 1;
        },
        setRecordedTime: (state, action) => {
            state.recordedTime = action.payload;
        },
    },
});

export const {
    setTeamName,
    setReduxScore,
    incrementTimeElapsed,
    setRecordedTime,
} = appReduxSlice.actions;

export const globalStore = (state) => state.app_reducer;
