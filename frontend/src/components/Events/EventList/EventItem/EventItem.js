import React from 'react';

import './EventItem.css';

const EventItem = props => {
    return (
        <li key={props.eventId}
            className="event__list-item">
            {props.title}
        </li>
    );
}

export default EventItem;
