import React from 'react';

import './Spinner.css';

const spinner = () => {
    return (
        <div className="spinner">
            <div className="lds-facebook"><div></div><div></div><div></div></div>
        </div>
    );
};

export default spinner;
