import { createSlice } from "@reduxjs/toolkit";

const GlobalStore = createSlice({
    name: "Global",
    initialState: {
        userData: [],
        teamName: null,
        score: 0,
    },

    reducers: {
        //actions
        setTeamName: (Data, action) => {
            Data.teamName = action.payload;
        },
        setReduxScore: (Data, action) => {
            Data.score = action.payload;
        },
    },
});

export const { setTeamName, setReduxScore } = GlobalStore.actions;

export default GlobalStore.reducer;

export const getTeamName = (state) => state.GlobalStore.teamName;
