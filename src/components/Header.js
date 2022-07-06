import React from 'react'

export default function Header() {
  return (
      
      <div className='container py-4'>
         <div className='d-flex justify-content-between align-items-center'>
            <div>
              <h1>Expense App</h1>
            </div>
            <div>
                <button className='btn btn-primary'>Add Budget</button>
                <button className='btn btn-warning ms-2'>Add Expense</button>
            </div>
         </div>
      </div>
  )
}
