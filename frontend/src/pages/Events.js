import React, { Component } from 'react';

import './Events.css';
import AuthContext from '../context/auth-context';
import Backdrop from '../components/Backdrop/Backdrop';
import Modal from '../components/Modal/Modal';

class EventsPage extends Component {
    state = {
        creating: false
    };

    static contextType = AuthContext;

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
        const title = this.titleElRef.current.value;
        const price = +this.priceElRef.current.value;
        const date = this.dateElRef.current.value;
        const description = this.descriptionElRef.current.value;

        console.log(`price = ${price}`);

        if (
            title.trim().length === 0 ||
            price <= 0 ||
            date.trim().length === 0 ||
            description.trim().length === 0
        ) {
            return;
        }

        const event = { title, price, date, description };
        console.log(event);

        let requestBody = {
            query: `
                mutation {
                    createEvent(eventInput: {
                        title: "${title}",
                        price: "${price}",
                        date: "${date}",
                        description: "${description}"
                    }) {
                        _id
                        title
                        price
                        date
                        description
                        creator {
                            _id
                            email
                        }
                    }
                }
            `
        }

        const token = this.context.token;

        fetch('http://localhost:8000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
        .then(res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Failed!');
            }
            return res.json();
        })
        .then(resData => {
            console.log(resData);
        })
        .catch(err => {
            console.log(err);
        })
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
                                <input type="datetime-local" id="date" ref={this.dateElRef}></input>
                            </div>
                            <div className="form-control">
                                <label htmlFor="description">Title</label>
                                <textarea id="description" rows="4" ref={this.descriptionElRef} />
                            </div>
                        </form>
                    </Modal>
                </React.Fragment>
            )}
            {this.context.token && (
                <div className="events-control">
                    <p>Share your own events!</p>
                    <button className="btn" onClick={this.startCreateEventHandler}>
                        Create Event
                    </button>
                </div>
            )}
            </React.Fragment>
        );
    }
}

export default EventsPage;
