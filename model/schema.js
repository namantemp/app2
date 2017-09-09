const mongoose = require('mongoose')

let main=new mongoose.Schema({
	Id: Number,
	FirstName: String,
	LastName: String,
	Age: Number},{collection : "Employee", versionKey : false}
)

let schema= mongoose.model('Employee',main);

module.exports= (schema);