const mongoose = require('mongoose')

const tweetSchema = new mongoose.Schema({
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:[true,'Please Provide a User']
    },
    tweetBody:{
        type:String,
        maxlength:250,
        required:[true,'You Cant Post an Empty Tweet']
    },
    likes:{
        type:Number,
        default:0,
    },
    retweet:{
        type:Number,
        default:0,
    },
    createdDate:{
        type:Date,
        default:Date.now()
    },
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Comment'
        }
    ]

},{timestamps:true})

module.exports = new mongoose.model('Tweet',tweetSchema)