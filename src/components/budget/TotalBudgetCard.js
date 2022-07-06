import React from 'react'

export default function TotalBudgetCard() {
    return (
        <div className="card bg-light">
            <div className="card-body">
                <h4 className="card-title d-flex justify-content-between align-items-baseline">
                    <div>Total Budget Card</div>
                    <div style={{fontWeight: '500',fontSize: '1.1rem'}}>
                        <span>$0</span> / <span>$1,000</span>
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
