const Employee = require('../models/employeeModel')
const res = require('express/lib/response')
const nocache = require('nocache')

const insertEmployee = async(req,res)=>{

    try {
        const employee = new Employee({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: req.body.password
        });
        const result = await employee.save();
        // res.send('registration successful'+result)
        res.redirect('login')

    } catch (error) {
        console.log(error)
    }

}


const getSignup = async (req,res)=>{
    res.render('register')
}

const getLogin = async (req,res)=>{
    try {

        if(req.session.isLoggedIn){

            console.log("req.session.isLoggedIn")
            res.redirect('/')
        }else{
            console.log("hai")
            res.render('login')
        }
    } catch (error) {
        console.log(error.message)
    }
}

const postLogin = async (req,res)=>{
   const userData = await Employee.findOne({email:req.body.email,admin:false})
   console.log(userData)
if(userData){

    if(req.body.password ===userData.password){
        req.session.isLoggedIn = userData.name;
        console.log(req.session.isLoggedIn)
        console.log('logged in')
        res.redirect('/')
    }else{
        console.log('password incorrect')
        res.render('login',{error:"incorrect password or email"})

    }
}else{
    console.log('not found')
    res.render('login',{error:"incorrect password or email"})

}

}


const getHome = async (req,res)=>{
     try {
        res.setHeader('Cache-Control','no-store')
        // if(req.session.id){
        if (req.session.isLoggedIn) {

        console.log("session is there")
        res.render('home',{userName:req.session.isLoggedIn})
        }else{
            console.log("no session")
            res.redirect('/login')
        }
     } catch (error) {
        console.log(error.message)
     }
}

const Logout = async (req, res) => {
    try {
        // req.session.id= false
        // console.log("loggoed out")
        req.session.destroy((err) => {
            if (err) {
                console.log(err.message);
            } else {
                console.log("Logout successful");
                res.redirect('/login'); // Redirect to the login page after logout
            }
        });
    } catch (error) {
        console.log(error.message);
    }
};



module.exports = { insertEmployee, getSignup, getLogin, postLogin, getHome, Logout };

