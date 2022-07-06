import React from 'react'
import {Link} from 'react-router-dom'
export default function NotFound() {
  return (
    <div className='d-flex justify-content-center vh-100 align-items-center'>

        <div className='text-center'>
                 <h1>404 Page Not Found</h1>
                 <span>back to <Link to="/">home</Link> page</span>
        </div>
    </div>
  )
}
