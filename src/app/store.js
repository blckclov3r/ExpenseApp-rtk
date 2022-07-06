
import { configureStore } from '@reduxjs/toolkit';
import budgetModal from '../feature/budget/modalSlice'

export const store = configureStore({
    reducer: {
        budgetModal: budgetModal
    }
})
