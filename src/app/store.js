
import { configureStore } from '@reduxjs/toolkit';
import budgetModal from '../feature/budget/modalSlice'
import budgetList from '../feature/budget/budgetSlice'
import expenseModal from '../feature/expense/modalSlice'
import expenseList from '../feature/expense/expenseSlice'


export const store = configureStore({
    reducer: {
        budgetModal: budgetModal,
        budgets: budgetList,

        expenseModal: expenseModal,
        expenses: expenseList
    }
})
