import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  visible: false,
  type: null,
  modalPayload: null,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showModal: (state, action) => {
      state.visible = true;
      state.type = action.payload.type;
      state.modalPayload = action.payload.modalPayload;
    },
    closeModal: state => {
      state.visible = false;
      state.type = null;
      state.modalPayload = null;
    },
  },
});

export const {showModal, closeModal} = modalSlice.actions;

export const selectModalVisible = state => state.modal.visible;
export const selectModalType = state => state.modal.type;
export const selectModalPayload = state => state.modal.modalPayload;

export default modalSlice.reducer;
