import React from 'react'
import { currencyFormatter } from '../../utils'

export default function BudgetCard({name,max,amount,showExpenseModal,viewExpenseModal}) {

    const percentage = ((amount / max) * 100)
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
                        <button className='btn btn-outline-primary d-flex align-items-center' onClick={showExpenseModal} >
                        <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
  <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" />
</svg>

                             <span className='ms-1'>Expense</span></button>
                        <button className='btn btn-outline-info d-flex align-items-center' onClick={viewExpenseModal}>
                       <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
</svg>

                             <span className='ms-1'>Expense</span></button>
                    </div>
                </div>
            </div>
        </>
        

    )
}
