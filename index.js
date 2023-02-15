require('dotenv').config()
const express = require('express')
const app = express()
const connectDB = require('./db/connects')
const PORT = process.env.PORT || 3000

app.use(express.json())

// Connecting Routers
const authRouters = require('./routers/Users')


app.use('/api/v1/Auth',authRouters)


app.get('/',(req,res)=>{
    res.send("Hello There")

})

const start = async () =>{
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(PORT,()=>{
            console.log(`Server is running on Port ${PORT}...`)
        })
    }catch (err){
        console.log(err)
    }
}

start()