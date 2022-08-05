
import { configureStore,combineReducers } from '@reduxjs/toolkit';
import budgetModal from '../feature/budget/modalSlice'
import budgetList from '../feature/budget/budgetSlice'
import expenseModal from '../feature/expense/modalSlice'
import expenseList from '../feature/expense/expenseSlice'

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'
  import storage from 'redux-persist/lib/storage'
  
  const persistConfig = {
    key: 'root',
    version: 1,
    storage,
  }

  const rootReducer = combineReducers(
    {
        budgetModal: budgetModal,
        budgets: budgetList,
        expenseModal: expenseModal,
        expenses: expenseList
    }
  )

  const persistedReducer = persistReducer(persistConfig, rootReducer)

  export const store = configureStore({
    reducer: persistedReducer,
    devTools: false,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  })

  export const persistor = persistStore(store)
