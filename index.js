const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/company');
const bcrypt = require('bcrypt')
const createError = require('http-errors');


const session = require('express-session')
const employee =require('./controllers/employeeController')

const employeeRoute =require('./routes/employeeRoute')
const adminRoute=require('./routes/adminRoute')
const nocache = require('nocache')

const express = require('express');
const app = express();



app.use(session({
    secret: 'my-secret-key',
    resave: false,
    saveUninitialized: false,
  }));

app.use(nocache())
app.use('/',employeeRoute)

app.use('/admin',adminRoute)



app.listen(2000,()=>{
    console.log("server running on port http://localhost:2000")
});


