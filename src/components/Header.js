import React from 'react'
import { useDispatch } from 'react-redux';
import {budgetShow } from '../feature/budget/modalSlice';
import { setBudgetId } from '../feature/expense/expenseSlice';
import { expenseShow } from '../feature/expense/modalSlice';

export default function Header() {

  const dispatch = useDispatch();

  const handleShowBudgetModal = ()=>{
    dispatch(budgetShow(true));
  }
  
  const handleShowExpenseModal = () =>{
    dispatch(expenseShow(true));
    dispatch(setBudgetId('uncategorized'));
  } 

  return (
      
      <>
        <div className='container py-4'>
          <div className='col-md-8'>
          <div className='d-flex justify-content-between align-items-center'>
            <div>
              <h1>Expense App</h1>
            </div>
            <div>
                <button className='btn btn-primary' onClick={handleShowBudgetModal}>Add Budget</button>
                <button className='btn btn-success ms-2' onClick={handleShowExpenseModal}>Add Expense</button>
            </div>
         </div>
          </div>
          <div className='col-md-4'>
            
          </div>
      </div>

      
      </>

      
  )
}
