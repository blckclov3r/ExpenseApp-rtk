import "./home.scss"
import BudgetCard from '../Budget/BudgetCard'
import TotalBudgetCard from '../Budget/TotalBudgetCard'

import { Button, Modal } from 'react-bootstrap';

import { nanoid } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux';
import { useRef } from 'react';

import { budgetClose, getShowBudgetModal } from '../../feature/budget/modalSlice';
import { setBudget, getAllBudgets } from '../../feature/budget/budgetSlice';

import { expenseClose, expenseShow, expenseView, getShowExpenseModal, getViewExpenseModal, viewExpenseClose } from "../../feature/expense/modalSlice";
import { deleteExpense, getAllExpenses, getBudget, getBudgetId, setBudgetId, setExpense, setExpenseBudget } from '../../feature/expense/expenseSlice';

export default function Index() {

  const dispatch = useDispatch();

  // budget input
  const nameRef = useRef();
  const maxRef = useRef();

  // expense input
  const descRef = useRef();
  const amountRef = useRef();
  const budgetIdRef = useRef();

  const handleBudgetClose = () => {
    dispatch(budgetClose(true))
  }

  const handleExpenseClose = () => {
    dispatch(expenseClose(true))
  }

  const handleViewExpenseClose = () =>{
    dispatch(viewExpenseClose(true));
  }

  const addBudgetFn = () => {

    const name = nameRef.current.value;
    const max = maxRef.current.value;
    const pass = [name, max].every(Boolean);

    if (pass) {

      dispatch(setBudget({
        id: nanoid(),
        name,
        max
      }));
      dispatch(budgetClose(true))

    }

  }


  const addExpenseFn = () => {
    const desc = descRef.current.value;
    const amount = Number(amountRef.current.value);
    const budgetId = budgetIdRef.current.value;

    const pass = [desc, amount, budgetId].every(Boolean);

    if (pass) {
      dispatch(setExpense({
        id: nanoid(),
        desc,
        amount,
        budgetId
      }));
      dispatch(expenseClose(true))
    }


  }

  const expenses = useSelector(getAllExpenses);

  const showExpenseModal = useSelector(getShowExpenseModal);
  const viewExpenseModal = useSelector(getViewExpenseModal);


  const showBudgetModal = useSelector(getShowBudgetModal);
  const budgets = useSelector(getAllBudgets);

  const budgetId = useSelector(getBudgetId);
  const budget = useSelector(getBudget);

  // filter method  will return an array object
  // const test = expenses.filter(expense => expense.budgetId === 'r5JOkVpPhMcyfKF16mQKF');
  // console.log(test)

  const deleteExpenseFn = (id) =>{

    dispatch(deleteExpense(id))
  }

  return (
    <>
      <div className='container'>
          <div className="row">
              <div className="col-md-8">
              <div className='collectionList'>
          {
            budgets?.map((budget => {
              const amount = expenses.filter(expense => expense.budgetId === budget.id)
                .reduce((total, expense) => total + expense.amount, 0)

              return <BudgetCard {...budget} key={budget.id} amount={amount ? amount : 0}

                viewExpenseModal={(e) => {
                  const result = budgets.find(x => x.id === budget.id);
                  dispatch(expenseView(true));
                  dispatch(setExpenseBudget(result))
                }}

                showExpenseModal={(e) => {
                  dispatch(expenseShow(true));
                  dispatch(setBudgetId(budget.id));
                }} />
            }))

          }

           <TotalBudgetCard />
        </div>
              </div>
              <div className="col-md-4">

              </div>
          </div>
      </div>



      {/* budgetModal */}
      <Modal show={showBudgetModal} onHide={handleBudgetClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>New Budget</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='form-group mb-3'>
            <label className='form-label'>Name</label>
            <input className='form-control' type='text' ref={nameRef} />
          </div>
          <div className='form-group mb-3'>
            <label className='form-label'>Maximum Spending</label>
            <input className='form-control' type='number' ref={maxRef} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleBudgetClose}>
            Close
          </Button>
          <Button variant="primary" onClick={addBudgetFn}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>

      {/* expenseModal */}
      <Modal show={showExpenseModal} onHide={handleExpenseClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>New Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='form-group mb-3'>
            <label className='form-label'>Description</label>
            <input className='form-control' type='text' ref={descRef} />
          </div>
          <div className='form-group mb-3'>
            <label className='form-label'>Amount</label>
            <input className='form-control' type='number' ref={amountRef} />
          </div>
          <div className='form-group mb-3'>
            <label className='form-label'>Amount</label>

            <select className="form-select" defaultValue={budgetId ? budgetId : 'uncategorized'} ref={budgetIdRef}>
              <option value='uncategorized'>Uncategorized</option>
              {
                budgets?.map((budget => (
                  <option key={budget.id} value={budget.id} >{budget.name}</option>
                )))
              }
            </select>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleExpenseClose}>
            Close
          </Button>
          <Button variant="primary" onClick={addExpenseFn}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>

         {/* viewExpenseModal */}
         <Modal show={viewExpenseModal} onHide={handleViewExpenseClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>{budget?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <ul className="list-group">
              { 
                expenses?.map((expense)=>(
                  <li key={expense.id} className='py-2 shadow-sm list-group-item d-flex justify-content-between'>
                      <span style={{fontSize: '1rem'}}>{expense.desc} - {expense.amount}</span>
                      <button className="btn btn-outline-none" style={{fontSize: '1rem',color: 'red'}} onClick={()=>{deleteExpenseFn(expense.id)}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
              <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
            </svg>

                      </button>
                  </li>
                ))
              }

             
              </ul>
        </Modal.Body>
     
      </Modal>

    </>

  )
}
