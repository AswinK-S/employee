const mongoose = require('mongoose');


const employee= mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type: String,
        required:true
    },
    phone:{
        type: Number,
        required:true
    },
    password:{
        type: String,
        required:true
    },
    admin:{
        type:Boolean,
        default:false
    }
})

module.exports = mongoose.model('Employee',employee);