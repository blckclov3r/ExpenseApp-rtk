import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    // id: null,
    // desc: '',
    // amount: 0,
    // budgetId: null
    expenseList: [],
    budgetId: '',
}


export const expenseSlice = createSlice({
    name: "expense",
    initialState,
    reducers: {
        setExpense: (state,action)=>{
            state.expenseList.push(action.payload)
        },
        getBudgetExpenses(state,action){
            const budgetId = action.payload;
            state.expenseList.filter(expense => expense.budgetId === budgetId);
        },
        setBudgetId(state,action){
            state.budgetId = action.payload;
        }
    }
});

export const getAllExpenses = (state) => state.expenses.expenseList;

export const getBudgetId = (state) => state.expenses.budgetId;

export const {setExpense,getBudgetExpenses,setBudgetId} = expenseSlice.actions
export default expenseSlice.reducer;