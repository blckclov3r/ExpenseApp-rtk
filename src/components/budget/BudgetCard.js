import React from 'react'

export default function BudgetCard() {

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
                        <div>Budget</div>
                        <div style={{fontWeight: '500',fontSize: '1.1rem'}}>
                            <span>$0</span> / <span>$1,000</span>
                        </div>
                    </h4>
                    <div className="card-text py-1">
                        <div className="progress">
                            <div className={getProgressBarColor(1000,1000)} role="progressbar" style={{width: '50%'}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                    </div>
                    <div className='d-flex justify-content-between mt-3'>
                        <button className='btn btn-outline-primary'>Add Expense</button>
                        <button className='btn btn-outline-secondary'>View Expense</button>
                    </div>
                </div>
            </div>
        </>
        

    )
}
