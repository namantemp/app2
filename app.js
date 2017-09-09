import express from 'express';
import config from './config/config';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import user from './model/newsschema';
import fs from 'fs';
import morgan from 'morgan';
import path from 'path';
import http from 'http';
import users from './routes/users';
import getval from './routes/getval';
import update from './routes/update';
import deleteval from  './routes/delete';

var cors= require('cors');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/update',update);
app.use('/getval',getval);
app.use('/users', users);
app.use('/delete',deleteval);
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

app.listen(3003);
