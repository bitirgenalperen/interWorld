const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookingSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    agentId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
    timeSlot: {
        startTime: { type: String, required: true }, // Format: 'YYYY-MM-DD-HH:mm'
        numSlots: { type: Number, default: 2, min: 1 } // Number of 15-minute slots, default to 2
    }
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
