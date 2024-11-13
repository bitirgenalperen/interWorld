const { type } = require('@testing-library/user-event/dist/type');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const projectSchema = new Schema({
    city: { type: String, required: true },
    district: {type: String},
    estType: {type: String, enum: ['Apartment', 'House'], required: true},
    size: {
        type: [Number],
        validate: {
          validator: function(arr) {
            return arr.length > 0 && arr.every(num => num >= 0 && num <= 6);
          },
          message: 'Size must contain at least one integer between 0 and 6.'}},
    description: { type: String, required: true},
    photos: {
        type: [String], // Array of image URLs
        validate: {
          validator: function(arr) {
            return arr.length > 3 && arr.length <= 10;
          },
          message: 'A property should have at least 3 photos.'
        }},
    favCount: {
      type: Number,
      default: 0
    },
    dateAdded: {
      type: Date,
      default: Date.now
    },
    price: {
      type: Number,
      validate: {
        validator: function(priceVal) {
          return priceVal > 200000;
        },
        message: 'Price should be a positive value greater than £200000'}}
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;