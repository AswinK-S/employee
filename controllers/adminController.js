
const mongoose = require('mongoose');
const res = require('express/lib/response')
const Employee = require('../models/employeeModel');
const nocache = require('nocache');



const getAdmin = async (req,res)=>{
    if(req.session.isLogged){
        console.log("session is there")
        res.redirect('/admin/admindash')
        // res.render('adminLogin')
    }
    else{
        res.render('admin');
    }
}

const postAdmin = async (req,res) =>{
    //admin login
    try{
        res.setHeader('Cache-Control','no-store')
        const adminData = await Employee.findOne({email:req.body.email,admin:true});
        console.log(adminData)
    if(adminData){
        if(req.body.password === adminData.password ){
            req.session.isLogged = true;
            console.log(req.session.id);
            console.log('logged in')
            res.redirect('/admin/admindash')           
        }
        else{
            console.log('password incorrect');
            res.render('admin',{error:"incorrect passwor or email"})
        }
    }else{
        console.log('not found')
        res.render('admin',{error:"you are not admin"})
    }

    }catch (error){
        console.log(error.message)
    }
}


const getDashboard = async (req,res)=>{
    try {
        res.setHeader('Cache-Control','no-store')
        if(req.session.isLogged){
            console.log(req.session.isLogged)
            const users = await Employee.find({admin:false})
            res.render('adminLogin',{users})
        }else{
            console.log("no session")
            res.render('admin')
        }
    } catch (error) {
        console.log(error.message)
    }
}


const getEdit = async (req,res)=>{
    try {
        // console.log(req)
        userData = await Employee.findOne({_id:req.params.id})
        if(userData){
        console.log(userData)
        res.render('edit',{name:userData})
        }
    } catch (error) {
        console.log('edit page is not loading')
    }
}

const editPost = async (req,res)=>{
    try {
        const editData = await Employee.findByIdAndUpdate(req.params.id,{
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: req.body.password,
        
          })
          console.log(editData)
        //   await res.redirect(`/edit/${req.params.id}`);
         res.redirect('/admin/admindash');

          console.log('redirected');
        
    } catch (error) {
        console.log(error)
    }
}


const adminSearch = async (req, res) => {
    try {
        console.log("requests:", req.body);
        const searchTerm = req.body.searchTerm;
        const regex = new RegExp(`.*${searchTerm}.*`, "i");
        const searchData = await Employee.find({$and:[{ name: {$regex: regex }},{admin:false}]});
        console.log(searchData);
        res.render('adminLogin',{users:searchData})
    } catch (error) {
        console.log(error.message);
    }
};


const adminSignout = async (req,res)=>{
    try{
        req.session.destroy((error)=>{
            if(error){
                console.log(error.message)
            }else{
                console.log("admin log out sucessfully")
                res.redirect("/admin")
            }
        })
    }catch (error){
        console.log(error.message)
    }
}


const deleteCustomer = async(req,res)=>{
    try{
        const deleteData = await Employee.deleteOne({_id:req.params.id})
        console.log(deleteData,"data deleted")
        res.redirect('/admin/admindash')
        // const users = await Employee.find({admin:false})
        // console.log(users)
        // res.render('adminLogin',{users})
    }catch(error){
        console.log(error.message)
    }
}



module.exports = {getAdmin,postAdmin,getEdit,editPost,getDashboard,adminSearch,adminSignout,deleteCustomer}


