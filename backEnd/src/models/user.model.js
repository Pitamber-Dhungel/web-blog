const mongoose=require('mongoose');


const userSchema=new mongoose.Schema({
    roles:{
        type:String,
        default:'user',
        enum:['user','admin'],
        required:true,
        trim:true,
    },
    name:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
        trim:true,
    },
    bio:{
        type:String,
        trim:true,
    },
    avatar:{
        type:String,
        trim:true,
    }
})

const User=mongoose.model('User',userSchema,'users')
module.exports=User;