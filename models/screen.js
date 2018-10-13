/*
Model class for Screen, it defines the schema of screen and validates the input.
*/

let mongoose = require('mongoose');

//Schema(model) of Row
//It contains field number of seats, aisle seats and reserved seats.
let RowSchema = new mongoose.Schema({
	numberOfSeats: {
		type: Number,
    required: true
	},
	aisleSeats: {
		type: [Number],
    default: []
	},
	reservedSeats: {
		type: [Number],
    default: []
	}
});

//Schema of Screen
//It contains field name of screen and array of seat information.
let ScreenSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  seatInfo: {
    type: Map,
		of: RowSchema,
    required: true
  }
});

let Screen = mongoose.model('Screen', ScreenSchema);

module.exports = {Screen}
