import React, { Component } from 'react';

import './Events.css';
import Backdrop from '../components/Backdrop/Backdrop';
import Modal from '../components/Modal/Modal';

class EventsPage extends Component {
    state = {
        creating: false
    };

    constructor(props) {
        super(props);
        this.titleElRef = React.createRef();
        this.priceElRef = React.createRef();
        this.dateElRef = React.createRef();
        this.descriptionElRef = React.createRef();
    }

    startCreateEventHandler = () => {
        this.setState({creating: true});
    };

    modalCancelHandler = () => {
        this.setState({creating: false});
    };

    modalConfirmHandler = () => {
        this.setState({creating: false});
        const price = this.priceElRef.current.value;
        const date = this.date.ElRef.current.value;
        const description = this.descriptionElRef.current.value;
        const title = this.titleElRef.current.value;

        if (
            title.trim().length === 0 ||
            price.trim().length === 0 ||
            date.trim().length === 0 ||
            description.trim().length === 0
        ) {
            return;
        }

        const event = { title, price, date, description };
        console.log(event);
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
                                <input type="text" id="title" ref={this.titleElRef}></input>
                            </div>
                            <div className="form-control">
                                <label htmlFor="price">Price</label>
                                <input type="number" id="price" ref={this.priceElRef}></input>
                            </div>
                            <div className="form-control">
                                <label htmlFor="date">Date</label>
                                <input type="date" id="date" ref={this.dateElRef}></input>
                            </div>
                            <div className="form-control">
                                <label htmlFor="description">Title</label>
                                <textarea id="description" rows="4" ref={this.descriptionElRef} />
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
