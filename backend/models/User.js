const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    fullName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    comPref: { type: String },
    mobilePhone: { type: String },
    languages: { type: [String], enum: ['en', 'tr', 'ms', 'zh', 'hi', 'ur', 'fr', 'ru'] }, // Updated to array of strings
    role: { type: String, enum: ['Client', 'Agent', 'Manager'], required: true }, // Add this field for RBAC
    favorites: [{ type: Schema.Types.ObjectId, ref: 'Project' }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;