const express = require('express');
const adminRoute = express();
const adminRouter= express.Router()
const nocache = require('nocache')
const adminController = require('../controllers/adminController')


adminRoute.set('view engine','ejs');
adminRoute.set('views','./views');

adminRoute.use(express.json());
adminRoute.use(express.urlencoded({extended:true}));

// adminRoute.use(nocache())

adminRoute.get('/admindash',adminController.getDashboard)
adminRoute.get('/',adminController.getAdmin);
adminRoute.post('/alogin',adminController.postAdmin)

adminRoute.get('/edit/:id',adminController.getEdit)
adminRoute.post('/edit/:id',adminController.editPost)

adminRoute.post('/searchUser',adminController.adminSearch)

adminRoute.post('/delete/:id',adminController.deleteCustomer)



adminRoute.post('/adminSignout',adminController.adminSignout)


module.exports =adminRoute;