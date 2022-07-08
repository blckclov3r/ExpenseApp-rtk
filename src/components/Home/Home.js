import "./home.scss"
import BudgetCard from '../Budget/BudgetCard'
import TotalBudgetCard from '../Budget/TotalBudgetCard'

import { Button, Modal } from 'react-bootstrap';
import { nanoid } from '@reduxjs/toolkit'
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { budgetClose, getShowBudgetModal } from '../../feature/budget/modalSlice';
import { setBudget, getAllBudgets, deleteBudgetId } from '../../feature/budget/budgetSlice';

import { expenseClose, expenseShow, expenseView, getShowExpenseModal, getViewExpenseModal, viewExpenseClose } from "../../feature/expense/modalSlice";
import { deleteExpense, deleteExpensesId, getAllExpenses, getBudget, getBudgetId, setBudgetId, setExpense, setExpenseBudget } from '../../feature/expense/expenseSlice';

import Swal from 'sweetalert2/dist/sweetalert2.js'
import { currencyFormatter } from "../../utils";

export default function Home() {

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

  const handleViewExpenseClose = () => {
    dispatch(viewExpenseClose(true));
  }

  const addBudgetFn = (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const max = maxRef.current.value;
    const pass = [name, max].every(Boolean);

    if (pass) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You want to add this budget",
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.isConfirmed) {

          dispatch(setBudget({
            id: nanoid(),
            name,
            max
          }));
          dispatch(budgetClose(true))

          Swal.fire(
            'Success!',
            'budget successfully added.',
            'success'
          )
        }
      })
     
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      })
    }
  
  }



  const addExpenseFn = (e) => {
    const desc = descRef.current.value;
    const amount = Number(amountRef.current.value);
    const budgetId = budgetIdRef.current.value;

    const pass = [desc, amount].every(Boolean);
    const optBudget = budgetId !== "uncategorized";
    if (pass && optBudget) {
      dispatch(setExpense({
        id: nanoid(),
        desc,
        amount,
        budgetId
      }));
      dispatch(expenseClose(true))
    } else {
      return;
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
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className='collectionList'>
              {
                budgets?.map((budget => {
                  const amount = expenses?.filter(expense => expense.budgetId === budget.id)
                    .reduce((total, expense) => total + expense.amount, 0)

                  return <BudgetCard {...budget} key={budget.id} amount={amount ? amount : 0}

                    viewExpenseModal={(e) => {
                      const result = budgets?.find(x => x.id === budget.id);
                      dispatch(expenseView(true));
                      dispatch(setExpenseBudget(result))
                    }}

                    deleteBudget={() => {
                      Swal.fire({
                        title: 'Are you sure?',
                        text: "You won't be able to revert this!",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Yes, delete it!'
                      }).then((result) => {
                        if (result.isConfirmed) {
                          dispatch(deleteBudgetId(budget.id));
                          dispatch(deleteExpensesId(budget.id))
                          Swal.fire(
                            'Deleted!',
                            `budget name ${budget.name} has been deleted.`,
                            'success'
                          )
                        }
                      })

                    }}

                    showExpenseModal={(e) => {
                      dispatch(expenseShow(true));
                      dispatch(setBudgetId(budget.id));
                    }} />
                }))

              }

              {(budgets.length > 0) && <TotalBudgetCard />}




            </div>
          </div>
        </div>
      </div>



      {/* budgetModal */}
      <Modal show={showBudgetModal} onHide={handleBudgetClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>New Budget</Modal.Title>
        </Modal.Header>
        <form onSubmit={addBudgetFn}>
          <Modal.Body>
            <div className='form-group mb-3'>
              <label className='form-label'>Name</label>
              <input className='form-control' type='text' ref={nameRef} required />
            </div>
            <div className='form-group mb-3'>
              <label className='form-label'>Maximum Spending</label>
              <input className='form-control' type='number' ref={maxRef} required />
            </div>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" type="button" onClick={handleBudgetClose}>
              Close
            </Button>
            <Button variant="primary" type="submit" >
              Add
            </Button>
          </Modal.Footer>
        </form>
      </Modal>

      {/* expenseModal */}
      <Modal show={showExpenseModal} onHide={handleExpenseClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>New Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='form-group mb-3'>
            <label className='form-label'>Description</label>
            <input className='form-control' type='text' ref={descRef} required />
          </div>
          <div className='form-group mb-3'>
            <label className='form-label'>Amount</label>
            <input className='form-control' type='number' ref={amountRef} required />
          </div>
          <div className='form-group mb-3'>
            <label className='form-label'>Amount</label>

            <select className="form-select" defaultValue={budgetId ? budgetId : 'uncategorized'} ref={budgetIdRef}>
              <option value='uncategorized' >Uncategorized</option>
              {
                budgets.map((budget => (
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
          <h6 style={{ color: '#777' }} className='ms-1'>{
            expenses?.find((expense) => expense.budgetId === budget?.id) ? 'Expenses' : 'No expenses found'
          }</h6>
          <ul className="list-group">
            {
              expenses?.filter((expense) => expense?.budgetId === budget?.id).map((expense) => (
                <li key={expense.id} className='py-2 shadow-sm list-group-item d-flex mb-2 justify-content-between align-items-center'>
                  <div style={{ fontSize: '1.1rem' }}>Desc: <span className="text-info fw-bold">{expense.desc} </span>|  Amount:<span className="text-primary fw-bold"> {currencyFormatter.format(expense.amount)}</span></div>
                  <button className="btn btn-danger" onClick={() => {
                    Swal.fire({
                      title: 'Are you sure?',
                      text: "You won't be able to revert this!",
                      icon: 'warning',
                      showCancelButton: true,
                      confirmButtonColor: '#3085d6',
                      cancelButtonColor: '#d33',
                      confirmButtonText: 'Yes, delete it!'
                    }).then((result) => {
                      if (result.isConfirmed) {

                        dispatch(deleteExpense(expense.id));

                        Swal.fire(
                          'Deleted!',
                          `Expense desc. ${expense.desc} has been deleted.`,
                          'success'
                        )
                      }
                    })

                  }
                  }>
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
