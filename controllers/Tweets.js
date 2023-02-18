const {StatusCodes} = require('http-status-codes')
const Users = require('../models/Users')
const Tweets = require('../models/Tweets')

const GetTweets = async (req,res)=>{
    const tweets = await Tweets.find({})
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

const DeleteTweet = async (req,res) =>{
    const {userId,username} = req.user
    const {tweetID} = req.params
    // Find tweet
    try{
        const tweet = await Tweets.findOne({_id:tweetID,createdBy:userId})
        // Delete the tweet
        const tweetDelete = await Tweets.findOneAndDelete({_id:tweetID,createdBy:userId})  
        res.status(StatusCodes.NO_CONTENT).send('')  

    } catch(error){
        res.status(StatusCodes.NOT_FOUND).json({message:"Tweet Not Found"})
    }

}

const LikeTweet = async (req,res) =>{
    const {tweetID} = req.params
    // Find the tweet
    const tweet =await Tweets.findOne({_id:tweetID})

    if(tweet === null){
        res.status(StatusCodes.NOT_FOUND).json({message:"Tweet Deleted"})
    }

    if(tweet != null){
        updated = await Tweets.findOneAndUpdate({_id:tweetID},{likes:tweet.likes+1},{new:true})
        res.status(StatusCodes.ACCEPTED).json(updated)
    }
    // like the tweet and increase the tweet counter
}

const UnLikeTweet = (req,res) =>{
    res.send('Unliked Tweet')
}

const CommentOnTweet = (req,res) =>{
    res.send('Comment Added to Tweet')
}


module.exports = {PostTweet,UpdateTweet,DeleteTweet,LikeTweet,UnLikeTweet,CommentOnTweet,GetTweets}