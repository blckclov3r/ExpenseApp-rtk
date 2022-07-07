import React from 'react'
import {  useSelector } from 'react-redux'
import { getAllBudgets } from '../../feature/budget/budgetSlice';
import { getAllExpenses } from '../../feature/expense/expenseSlice';
import { currencyFormatter } from '../../utils';

export default function TotalBudgetCard() {
    

    const budgets =  useSelector(getAllBudgets);
    const maxTotal = budgets.reduce((total,budget)=>total+budget.max,0);

    const expenses =  useSelector(getAllExpenses);
    const expenseTotal = expenses.reduce((total,expense)=>total+expense.amount,0);

    return (
        <div className="card bg-light">
            <div className="card-body">
                <h4 className="card-title d-flex justify-content-between align-items-baseline">
                    <div>Total</div>
                    <div style={{fontWeight: '500',fontSize: '1.1rem'}}>
                        <span>{currencyFormatter.format(expenseTotal)}</span> / <span>{currencyFormatter.format(maxTotal)}</span>
                    </div>
                </h4>
                <div className="card-text py-1">
                    <div className="progress">
                        <div className="progress-bar" role="progressbar" width={100} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                </div>
            </div>
        </div>

    )
}
