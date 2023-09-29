const express = require('express');
const employeeRoute =express();
const employeeController = require('../controllers/employeeController')

employeeRoute.use(express.json());
employeeRoute.use(express.urlencoded({extended:true}));

employeeRoute.set('view engine','ejs');
employeeRoute.set('views','./views')

employeeRoute.get('/',(req,res)=>{
    res.render('register')
})
employeeRoute.post('/',employeeController.insertEmployee)


module.exports = employeeRoute;