const {StatusCodes} = require('http-status-codes')
const Users = require('../models/Users')
const Tweets = require('../models/Tweets')

const GetTweets = async (req,res)=>{
    const tweets = await Tweets.find({})

    console.log(tweets.length)

    if(tweets.length <= 0 ){
        res.status(StatusCodes.BAD_REQUEST).json({message:"No Tweets Available Yet"})
    }
    if(tweets.length > 0 ){
        res.status(StatusCodes.OK).json(tweets)
    }
}
const PostTweet = async (req,res)=>{
    const {email} = req.user
    const {tweetBody} = req.body
    // if the tweet body is empty
    if(!tweetBody){
        res.status(StatusCodes.BAD_REQUEST).json({"message":"You Cannot Add an empty tweet"})
    }
    // if there is tweetbody
    if(tweetBody){
        // Find the User
        const user = await Users.findOne({email:email})
        const {_id} = user 
        // Create the Tweet
        const newTweet = await Tweets.create({...req.body,createdBy:_id})   
        res.status(StatusCodes.CREATED).json(newTweet)
    }
}

const UpdateTweet = (req,res) =>{
    res.send('Tweet Deleted')
}

const DeleteTweet = (req,res) =>{
    res.send('Tweet Deleted')
}

const LikeTweet = (req,res) =>{
    res.send('Liked Tweet')
}

const UnLikeTweet = (req,res) =>{
    res.send('Unliked Tweet')
}

const CommentOnTweet = (req,res) =>{
    res.send('Comment Added to Tweet')
}


module.exports = {PostTweet,UpdateTweet,DeleteTweet,LikeTweet,UnLikeTweet,CommentOnTweet,GetTweets}