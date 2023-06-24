import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  visible: false,
  modalPayload: null,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showModal: (state, action) => {
      state.visible = true;
      state.modalPayload = action.payload;
    },
    closeModal: state => {
      state.visible = false;
      state.modalPayload = null;
    },
  },
});

export const {showModal, closeModal} = modalSlice.actions;

export const selectModalVisible = state => state.modal.visible;
export const selectModalPayload = state => state.modal.modalPayload;

export default modalSlice.reducer;
