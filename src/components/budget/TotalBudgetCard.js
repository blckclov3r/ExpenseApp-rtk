import {  useSelector } from 'react-redux'
import { getAllBudgets } from '../../feature/budget/budgetSlice';
import { getAllExpenses } from '../../feature/expense/expenseSlice';
import { currencyFormatter } from '../../utils';

export default function TotalBudgetCard() {
    

    const budgets =  useSelector(getAllBudgets);
 


    const maxTotal = budgets.reduce((total,budget)=>{
       return total+Number(budget.max)
    },0);

    const expenses =  useSelector(getAllExpenses);
    const filterExpenses = expenses?.filter((expense)=>{
        return expense.budgetId !== "uncategorized";
    })
    const expenseTotal = filterExpenses.reduce((total,expense)=>total+Number(expense.amount),0);

    const percentage = ((expenseTotal / maxTotal) * 100)
    const getProgressBarColor = (amount,max)=>{
        const ratio = amount / max;
        if(ratio < 0.5){
            return 'bg-primary';
        }
        if(ratio < 0.75){
            return 'bg-warning'
        }
        return 'bg-danger'
    }


    return (
        <div className="card" style={{borderLeft: '6px solid #299d74'}}>
            <div className="card-body">
                <h4 className="card-title d-flex justify-content-between align-items-baseline">
                    <div>Total</div>
                    <div style={{fontWeight: '500',fontSize: '1.1rem'}}>
                        <span style={{fontSize: '1.6rem'}}>{currencyFormatter.format(Number(expenseTotal))}</span> / <span>{currencyFormatter.format(Number(maxTotal))}</span>
                    </div>
                </h4>
                <div className="card-text py-1">
                <div className="progress">
                            <div className={getProgressBarColor(expenseTotal,maxTotal)} role="progressbar" style={{width: `${percentage}%`}} aria-valuenow={expenseTotal} aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                </div>
            </div>
        </div>

    )
}
