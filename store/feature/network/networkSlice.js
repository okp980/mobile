import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isConnected: false,
};

export const networkSlice = createSlice({
  name: 'network',
  initialState,
  reducers: {
    setNetwork: (state, action) => {
      state.isConnected = action.payload.isConnected;
    },
  },
});

export const {setNetwork} = networkSlice.actions;

export const selectIsConnected = state => state.network.isConnected;

export default networkSlice.reducer;
