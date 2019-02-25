const { transformEvent } = require('./transforms');
const Event = require('../../models/event');
const User = require('../../models/user');

const EventsResolvers = {
    events: async () => {
        try {
            const events = await Event.find();

            return events.map(event => {
                return transformEvent(event);
            })
        } catch (err) {
            throw err;
        };
    },
    createEvent: async (args, req) => {
        if (!req.isAuth) {
            throw new Error('Unauthenticated!');
        }

        const event = new Event({
            title: args.eventInput.title,
            description: args.eventInput.description,
            price: +args.eventInput.price,
            date: new Date(args.eventInput.date),
            creator: '5c724bb64a88a94db9f8b9ee'
        });

        let createdEvent;
        try {
            const result = await event.save()

            createdEvent = transformEvent(result);

            const creator = await User.findById('5c724bb64a88a94db9f8b9ee');

            if (!creator) {
                throw new Error('User not found.');
            }
            creator.createdEvents.push(event);
            await creator.save();

            return createdEvent
        } catch (err) {
            throw err;
        };
    }
}

module.exports = EventsResolvers;
