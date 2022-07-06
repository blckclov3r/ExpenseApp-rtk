import React from 'react'
import { useDispatch } from 'react-redux';
import {budgetShow } from '../feature/budget/modalSlice';

export default function Header() {
  const dispatch = useDispatch();



  const handleShow = ()=>{
    dispatch(budgetShow(true))
  }

  return (
      
      <>
        <div className='container py-4'>
         <div className='d-flex justify-content-between align-items-center'>
            <div>
              <h1>Expense App</h1>
            </div>
            <div>
                <button className='btn btn-primary' onClick={handleShow}>Add Budget</button>
                <button className='btn btn-warning ms-2'>Add Expense</button>
            </div>
         </div>
      </div>

      
      </>

      
  )
}
