const DataLoader = require('dataloader');

const { dateToString } = require('../../helpers/date');
const Event = require('../../models/event');
const User = require('../../models/user');

const eventLoader = new DataLoader(eventIds => {
    return events(eventIds);
});

const userloader = new DataLoader(userIds => {
    return User.find({_id: {$in: userIds}});
});

const transformBooking = booking => {
    return {
        ...booking._doc,
        _id: booking.id,
        user: user.bind(this, booking._doc.user),
        event: singleEvent.bind(this, booking._doc.event),
        createdAt: dateToString(booking._doc.createdAt),
        updatedAt: dateToString(booking._doc.updatedAt)
    }
};

const transformEvent = event => {
    return {
        ...event._doc,
        _id: event.id,
        date: dateToString(event._doc.date),
        creator: user.bind(this, event.creator)
    }
};

const events = async eventIds => {
    try {
        const events = await Event.find({ _id: { $in: eventIds } });

        return events.map(event => {
            return transformEvent(event);
        });
    } catch (err) {
        throw err;
    }
};

const singleEvent = async eventId => {
    try {
        return await eventLoader.load(eventId.toString());
    } catch (err) {
        throw err;
    }
}

const user = async userId => {
    try {
        const user = await userloader.load(userId.toString());

        return {
            ...user._doc,
            _id: user.id,
            createdEvents: () => eventLoader.loadMany(user._doc.createdEvents)
        };
    } catch (err) {
        throw err;
    }
};

module.exports = { transformBooking, transformEvent };
