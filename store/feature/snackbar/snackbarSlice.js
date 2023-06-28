import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  show: false,
  toastType: 0,
  message: '',
};

export const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    setMessage: (state, action) => {
      state.show = true;
      state.toastType = 0;
      state.message = action.payload.message;
    },
    setSuccessMessage: (state, action) => {
      state.show = true;
      state.toastType = 1;
      state.message = action.payload.message;
    },
    setWarningMessage: (state, action) => {
      state.show = true;
      state.toastType = 2;
      state.message = action.payload.message;
    },
    setErrorMessage: (state, action) => {
      state.show = true;
      state.toastType = 3;
      state.message = action.payload.message;
    },
    clear: state => {
      state.show = false;
      state.toastType = 0;
      state.message = '';
    },
  },
});

export const {
  setMessage,
  setSuccessMessage,
  setWarningMessage,
  setErrorMessage,
  clear,
} = snackbarSlice.actions;

export const selectShowToast = state => state.snackbar.show;
export const selectToastType = state => state.snackbar.toastType;
export const selectToastMessage = state => state.snackbar.message;

export default snackbarSlice.reducer;
