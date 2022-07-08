import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    // id: null,
    // desc: '',
    // amount: 0,
    // budgetId: null
    expenseList: [],
    budgetId: '',
    budget: {}
}


export const expenseSlice = createSlice({
    name: "expense",
    initialState,
    reducers: {
        setExpense: (state,action)=>{
            state.expenseList = [...state.expenseList,action.payload];
        },
        getBudgetExpenses(state,action){
            const budgetId = action.payload;
            state.expenseList.filter(expense => expense.budgetId === budgetId);
        },
        setBudgetId(state,action){
            state.budgetId = action.payload;
        },
        setExpenseBudget(state,action){
            state.budget = action.payload;
        },
        deleteExpense(state,action){
            const expenses = state.expenseList.filter(expense => expense.id !== action.payload);
            state.expenseList = expenses;
        },
        deleteExpensesId(state,action){
            const expenses = state.expenseList.filter(expense => expense.budgetId !== action.payload);
            state.expenseList = expenses;
        },
    }
});

export const getAllExpenses = (state) => state.expenses.expenseList;

export const getBudgetId = (state) => state.expenses.budgetId;
export const getBudget = (state) =>state.expenses.budget;

export const {setExpense,getBudgetExpenses,setBudgetId,setExpenseBudget,deleteExpense,deleteExpensesId} = expenseSlice.actions
export default expenseSlice.reducer;