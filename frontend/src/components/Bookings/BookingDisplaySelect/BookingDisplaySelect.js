import React from 'react';

import './BookingDisplaySelect.css'

const bookingDisplaySelect = props => {
    return (
        <div className="booking-display-select">
            <button
                className={props.activeOutputType === 'list' ? 'active' : ''}
                onClick={props.onChange.bind(this, 'list')}
            >
                List
            </button>
            <button
                className={props.activeOutputType === 'chart' ? 'active' : ''}
                onClick={props.onChange.bind(this, 'chart')}
            >
                Chart
            </button>
        </div>
    );
};

export default bookingDisplaySelect;
