import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    show: false,
    close: false,

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
      
    }
});


// this (expenseModal) located under source directory app > storejs
export const getShowExpenseModal = (state) => state.expenseModal.show;

export const getClose = (state) => state.expenseModal.close;

// the purpose of this line of code is to update the state using dispatch
export const {expenseShow,expenseClose} = modalSlice.actions

export default modalSlice.reducer