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
                        <form>
                            <div className="form-control">
                                <label htmlFor="title">Title</label>
                                <input type="text" id="title"></input>
                            </div>
                            <div className="form-control">
                                <label htmlFor="price">Price</label>
                                <input type="number" id="price"></input>
                            </div>
                            <div className="form-control">
                                <label htmlFor="date">Date</label>
                                <input type="date" id="date"></input>
                            </div>
                            <div className="form-control">
                                <label htmlFor="description">Title</label>
                                <textarea id="description" rows="4" />
                            </div>
                        </form>
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
