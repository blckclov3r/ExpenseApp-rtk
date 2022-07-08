import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {budgetShow } from '../feature/budget/modalSlice';
import { setBudgetId } from '../feature/expense/expenseSlice';
import { expenseShow } from '../feature/expense/modalSlice';
import { getAllBudgets } from '../feature/budget/budgetSlice';

export default function Header() {

  const dispatch = useDispatch();

  const handleShowBudgetModal = ()=>{
    dispatch(budgetShow(true));
  }
  
  const handleShowExpenseModal = () =>{
    dispatch(expenseShow(true));
    dispatch(setBudgetId('uncategorized'));
  } 

  const budgets = useSelector(getAllBudgets);



  return (
      
      <>
        <div className='container py-4'>
          <div className='col-md-8'>
          <div className='d-flex justify-content-between align-items-center flex-wrap'>
        
              <h1 className='mb-0'>Expense App</h1>
            <div>
                <button className='btn btn-primary' onClick={handleShowBudgetModal}>Add Budget</button>
                <button className='btn btn-warning ms-2' disabled={budgets.length <= 0} onClick={handleShowExpenseModal}>Add Expense</button>
            </div>
         </div>
          </div>
          <div className='col-md-4'>

          </div>
      </div>

      
      </>

      
  )
}
