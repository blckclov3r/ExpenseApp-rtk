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
import { getAllExpenses, getBudget, getBudgetId, setBudgetId, setExpense, setExpenseBudget } from '../../feature/expense/expenseSlice';

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

  return (
    <>
      <div className='container'>
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
          
        </Modal.Body>
     
      </Modal>

    </>

  )
}
