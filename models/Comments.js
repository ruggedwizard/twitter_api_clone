const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    tweetId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Tweet',
        required:[true,'A Comment Must Belong to A Tweet']
    },
    commentBody:{
        type:String
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