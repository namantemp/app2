import express from 'express';
import config from './config/config';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import user from './model/newsschema';
import fs from 'fs';
import morgan from 'morgan';
import path from 'path';
import http from 'http';
var cors= require('cors');
const app = express();

http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

//Setting up the connection with DataBase(Mongodb)
mongoose.connect(config.dbUrl);		
mongoose.connection.on('connected',()=>{
	console.log("Successfully Connected")
});
mongoose.connection.on('error',()=>{
	console.log("Error in Connecting");
});
//Creates log file
let accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'});
app.use(morgan('combined', {stream: accessLogStream}));
app.get('/',(req, res, next)=> {
  user.find((err,user)=>{
  	if(err){
  		console.log(err);
  		res.send(err);
  	}
  	else{
  		console.log("Get Method");
  		res.json({user:user});
  	}
  })
});
app.post('/',(req, res, next)=> {
  let Id = req.body.Id;
  let FirstName = req.body.FirstName;
  let LastName = req.body.LastName;
  let Age = req.body.Age;
  user.insertMany({
    "Id" : Id,
    "FirstName": FirstName,
    "LastName" : LastName,
    "Age" : Age
  },(err,user)=>{
    if(err){
      console.log(err);
    }
    else{
      console.log("Post Method");
      res.json({data:user});
    }
  })
});
app.put('/:Id',(req, res, next)=> {
  user.update({Id: req.params.Id},{$set:{
  	FirstName: req.body.FirstName,
  	LastName: req.body.LastName,
  	Age: req.body.Age}},{upsert:true}
  	,(err,user)=>{
    if(err){
      console.log(err);
    }
    else{
      console.log("Modified");
      res.json({user:user});
    }
  })
});
app.delete('/:Id',(req, res, next)=> {
  user.remove({Id: req.params.Id},
  	(err,user)=>{
    if(err){
      console.log(err);
    }
    else{
      console.log("Deleted");
      res.json({user});
    }
  })
});
app.listen(3003);

