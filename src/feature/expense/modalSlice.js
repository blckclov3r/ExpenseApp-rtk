import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    show: false,
    close: false,
    view: false,
    viewClose: false,
}

export const modalSlice  = createSlice({
    name: "expenseModal",
    initialState,
    reducers: {
        expenseShow: (state,action)=>{
            state.show = action.payload
        },
        expenseClose: (state,action)=>{
            state.close = action.payload;
            state.show = false;
        },
        expenseView: (state,action)=>{
            state.view = action.payload;
        },
        viewExpenseClose: (state,action)=>{
            state.viewClose = action.payload;
            state.view = false;
        },
    }
});


// this (expenseModal) located under source directory app > storejs
export const getShowExpenseModal = (state) => state.expenseModal.show;
export const getViewExpenseModal = (state) => state.expenseModal.view;

export const getClose = (state) => state.expenseModal.close;

// the purpose of this line of code is to update the state using dispatch
export const {expenseShow,expenseClose, expenseView,viewExpenseClose} = modalSlice.actions

export default modalSlice.reducer