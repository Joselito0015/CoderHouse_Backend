const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const ticketCollection = "tickets";

const ticketSchema = new mongoose.Schema({
	code: {
		//unico y autoincremental
		type: String,
		required: true,
		unique: true,
	},
	purchaseDate: {
		type: Date,
		required: true,
	},
	amount: {
		type: Number,
		required: true,
	},
	purchaser: {
		type: String,
		required: true,
	},
});

//aouto generate code with a uuid
ticketSchema.pre("save", function (next) {
	const ticket = this;
	if (!ticket.code) {
		ticket.code = uuidv4();
	}
	next();
});

const Ticket = mongoose.model(ticketCollection, ticketSchema);

module.exports = Ticket;
