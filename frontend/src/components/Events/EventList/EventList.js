import React from 'react';

import EventItem from './EventItem/EventItem';

import './EventList.css';

const EventList = props => {
    // map events?
    const events = props.events.map(event => {
        return (
            <EventItem
                key={event._id}
                eventId={event._id}
                title={event.title}
                userId={props.authUserId}
                creatorId={props.creator._id}
            />
        );
    });

    return (
        <ul className="event__list">{events}</ul>
    );
}

export default EventList;
