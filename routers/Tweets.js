const express = require('express')
const router = express.Router()
const {PostTweet,LikeTweet,UnLikeTweet,DeleteTweet,UpdateTweet,CommentOnTweet,GetTweets} = require('../controllers/Tweets')
const authMiddleware = require('../middlewares/Authentication')


router.get('/',GetTweets)

router.post('/',authMiddleware,PostTweet)

router.delete('/:tweetID',authMiddleware,DeleteTweet)

router.patch('/:tweetID',UpdateTweet)



module.exports = router