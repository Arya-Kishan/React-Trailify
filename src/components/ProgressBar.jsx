import React from 'react'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function ProgressBar({vote}) {
    return (
        <div>
            <div className='progressbar' style={{ width: 50, height: 50 }}>
                <CircularProgressbar value={vote.toFixed(1)} maxValue={10} text={vote.toFixed(1)} />
            </div>
        </div>
    )
}
