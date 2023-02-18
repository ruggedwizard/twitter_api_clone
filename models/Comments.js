const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    tweetId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Tweet',
        required:[true,'A Comment Must Belong to A Tweet']
    },
    commentBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'CommentOwner',
        required:[true,'A User Must Add A Comment']
    }
    ,
    commentBody:{
        type:String
    },
    likes:{
        type:Number,
        default:0
    },
    retweets:{
        type:Number,
        default:0
    }
    ,
    replies:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Comments'
        }
    ]
},{timestamps:true})


module.exports = mongoose.model('Comments',commentSchema)