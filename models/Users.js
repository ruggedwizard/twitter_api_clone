const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:[true,'Please Enter Your fullname'],
        minlength:5
    },
    bio:{
        type:String,
        maxlength:300
    },
    location:{
        type:String
    },
    website:{
        type:String
    },
    email:{
        type:String,
        required:[true,'Please Provide an Emial address'],
        match:[/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,'Please Provide a Valid Email'],
        minlength:5,
        maxlength:100,
        unique:true
    },
    date_of_birth:{
        type:Date
    },
    password:{
        type:String,
        required:[true,'Please Enter a minimum of 8 Characters password']
    },
    username:{
        type:String,
        required:[true,'Please Choose a Valid Username'],
        unique:true
    },
    isVerified:{
        type:Boolean,
        required:[true,'You must set a verified status'],
        default: false,
    },
    followers:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Followers'
        }
    ],
    following:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Following'
        }
    ],
    tweets:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Tweets'
        }
    ]
})


module.exports = mongoose.model('User',userSchema)