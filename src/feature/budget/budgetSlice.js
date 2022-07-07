import { createSlice } from "@reduxjs/toolkit";


    


export const budgetSlice = createSlice({
    name: "budget",
    initialState: {
        budgetList: []
    },
    reducers: {
        setBudget: (state,action)=> {
            state.budgetList.push(action.payload);
        }
    }
});

export const getAllBudgets = (state) => state.budgets.budgetList;

export const {setBudget} = budgetSlice.actions
export default budgetSlice.reducer