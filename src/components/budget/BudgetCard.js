import React from 'react'
import { currencyFormatter } from '../../utils'

export default function BudgetCard({id,name,max,amount,showExpenseModal}) {
    
    const percentage = ((amount / max) * 100)
    console.log(percentage)
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
    console.log(percentage)
    return (
        <>
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title d-flex justify-content-between align-items-baseline">
                        <div>{name}</div>
                        <div style={{fontWeight: '500',fontSize: '1.1rem'}}>
                            <span style={{fontSize: '1.6rem'}}>{currencyFormatter.format(amount)}</span> / <span>{currencyFormatter.format(max)}</span>
                        </div>
                    </h4>
                    <div className="card-text py-1">
                        <div className="progress">
                            <div className={getProgressBarColor(amount,max)} role="progressbar" style={{width: `${percentage}%`}} aria-valuenow={amount} aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                    </div>
                    <div className='d-flex justify-content-between mt-3'>
                        <button className='btn btn-outline-primary' onClick={showExpenseModal} >Add Expense</button>
                        <button className='btn btn-outline-secondary'>View Expense</button>
                    </div>
                </div>
            </div>
        </>
        

    )
}
