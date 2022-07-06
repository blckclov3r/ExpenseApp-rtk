import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    show: false,
    close: false,

}

export const modalSlice  = createSlice({
    name: "budgetModal",
    initialState,
    reducers: {
        budgetShow: (state,action)=>{
            state.show = action.payload
        },
        budgetClose: (state,action)=>{
            state.close = action.payload;
            state.show = false;
        },
      
    }
});


// this (budgetModal) located under source directory app > storejs
export const getShow = (state) => state.budgetModal.show;

export const getClose = (state) => state.budgetModal.close;

// the purpose of this line of code is to update the state using dispatch
export const {budgetShow,budgetClose,budgetOpen} = modalSlice.actions

export default modalSlice.reducer