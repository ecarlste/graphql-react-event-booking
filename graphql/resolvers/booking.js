const { transformBooking, transformEvent } = require('./transforms');
const Booking = require('../../models/booking');
const Event = require('../../models/event');

const BookingResolvers = {
    bookings: async (args, req) => {
        if (!req.isAuth) {
            throw new Error('Unauthenticated!');
        }

        try {
            const bookings = await Booking.find();
            return bookings.map(booking => {
                return transformBooking(booking);
            })
        } catch (err) {
            throw err;
        }
    },
    bookEvent: async (args, req) => {
        if (!req.isAuth) {
            throw new Error('Unauthenticated!');
        }

        const fetchedEvent = await Event.findOne({ _id: args.eventId });

        const booking = new Booking({
            user: req.userId,
            event: fetchedEvent
        })

        const result = await booking.save();

        return transformBooking(result);
    },
    cancelBooking: async (args, req) => {
        if (!req.isAuth) {
            throw new Error('Unauthenticated!');
        }

        try {
            const fetchedBooking = await Booking.findById({ _id: args.bookingId })
                .populate('event');

            const event = transformEvent(fetchedBooking.event);

            await Booking.deleteOne({ _id: args.bookingId });

            return event;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = BookingResolvers;
