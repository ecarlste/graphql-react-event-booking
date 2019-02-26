import React, { Component } from 'react';

import './Events.css';
import Backdrop from '../components/Backdrop/Backdrop';
import Modal from '../components/Modal/Modal';

class EventsPage extends Component {
    state = {
        creating: false
    };

    startCreateEventHandler = () => {
        this.setState({creating: true});
    };

    modalCancelHandler = () => {
        this.setState({creating: false});
    };

    modalConfirmHandler = () => {
        this.setState({creating: false});
    };

    render() {
        return (
            <React.Fragment>
            {this.state.creating && (
                <React.Fragment>
                    <Backdrop />
                    <Modal title="Add Event" canCancel canConfirm onCancel={this.modalCancelHandler} onConfirm={this.modalConfirmHandler}>
                        <p>Modal Content</p>
                    </Modal>
                </React.Fragment>
            )}
                <div className="events-control">
                    <p>Share your own events!</p>
                    <button className="btn" onClick={this.startCreateEventHandler}>Create Event</button>
                </div>
            </React.Fragment>
        );
    }
}

export default EventsPage;
