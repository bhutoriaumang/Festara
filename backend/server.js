require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const eventRoutes = require('./routes/eventRoutes')

const app = express()

app.use(express.json())

app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next()
})

app.use('/home/api/events',eventRoutes)

mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log('Connected to database')

        app.listen(process.env.PORT,()=>{
            console.log('Listening and connected to port ',process.env.PORT)
        })
    }).catch((err) => {
        console.log(err)
    })