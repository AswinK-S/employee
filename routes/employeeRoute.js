const express = require('express');
const employeeRoute =express();
const nocache = require('nocache')
const employeeController = require('../controllers/employeeController')

employeeRoute.use(express.json());
employeeRoute.use(express.urlencoded({extended:true}));

employeeRoute.set('view engine','ejs');
employeeRoute.set('views','./views')

employeeRoute.get('/register',employeeController.getSignup)
employeeRoute.post('/register',employeeController.insertEmployee);

employeeRoute.get('/login',nocache(),employeeController.getLogin)
employeeRoute.post('/submit',employeeController.postLogin);

employeeRoute.get('/',nocache(),employeeController.getHome)
employeeRoute.post('/logout',employeeController.Logout)




module.exports = employeeRoute;


