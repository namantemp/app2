const mongoose = require('mongoose')

let main=new mongoose.Schema({
	author: String,
	title: String,
	description: String,
	urlToImage:String},{collection : "News", versionKey : false,unique:true}
)

let schema= mongoose.model('News',main);

module.exports= (schema);