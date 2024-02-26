import { createSlice } from '@reduxjs/toolkit';

const GlobalStore = createSlice({
  name: 'Global',
  initialState: {
    userData: [],
    teamName: null,
  },

  reducers: {
    //actions
    setTeamName: (Data, action) => {
      Data.teamName = action.payload;
    },
  },
});

export const { setTeamName } = GlobalStore.actions;

export default GlobalStore.reducer;

export const getTeamName = (state) => state.GlobalStore.teamName;
