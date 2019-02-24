const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');

const Event = require('./models/event');
const User = require('./models/user');

const app = express();

const events = [];

const opt = { useNewUrlParser: true };

app.use(bodyParser.json());

const user = userId => {
    return User.findById(userId)
        .then(user => {
            return { ...user._doc, _id: user.id };
        })
        .catch(err => {
            throw err;
        })
};

app.use('/graphql', graphqlHttp({
    schema: buildSchema(`
        type Event {
            _id: ID!
            title: String!
            description: String!
            price: Float!
            date: String!
            creator: User!
        }

        type User {
            _id: ID!
            email: String!
            password: String
            createdEvents: [Event!]
        }

        input EventInput {
            title: String!
            description: String!
            price: Float!
            date: String!
        }

        input UserInput {
            email: String!
            password: String!
        }

        type RootQuery {
            events: [Event!]!
        }

        type RootMutation {
            createEvent(eventInput: EventInput): Event
            createUser(userInput: UserInput): User
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
        events: () => {
            return Event.find()
                .then(events => {
                    return events.map(event => {
                        return {
                            ...event._doc,
                            _id: event.id,
                            creator: user.bind(this, event._doc.creator)
                        };
                    })
                }).catch(err => {
                    throw err;
                });
        },
        createEvent: args => {
            const event = new Event({
                title: args.eventInput.title,
                description: args.eventInput.description,
                price: +args.eventInput.price,
                date: new Date(args.eventInput.date),
                creator: '5c724bb64a88a94db9f8b9ee'
            });

            let createdEvent;

            return event
                .save()
                .then(result => {
                    createdEvent = { ...result._doc, _id: result.id };
                    return User.findById('5c724bb64a88a94db9f8b9ee');
                })
                .then(user => {
                    if (!user) {
                        throw new Error('User not found.');
                    }
                    user.createdEvents.push(event);
                    return user.save();
                })
                .then(() => { return createdEvent })
                .catch(err => {
                    console.log(err);
                    throw err;
                });
        },
        createUser: args => {
            return User.findOne({ email: args.userInput.email })
                .then(user => {
                    if (user) {
                        throw new Error('User already exists.');
                    }

                    return bcrypt.hash(args.userInput.password, 12);
                })
                .then(hashedPassword => {
                    const user = new User({
                        email: args.userInput.email,
                        password: hashedPassword
                    });

                    return user.save()
                })
                .then(result => {
                    console.log(result);
                    return { ...result._doc, password: null, _id: result.id };
                })
                .catch(err => {
                    console.log(err);
                    throw err;
                })


        }
    },
    graphiql: true
}));

mongoose.connect(
        `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-sosdu.gcp.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`,
        opt
    )
    .then(() => {
        app.listen(process.env.NOVE_ENV || 3000);
    })
    .catch(err => {
        console.log(err);
    });
