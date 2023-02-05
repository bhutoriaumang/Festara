const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({_id},process.env.JWT_SECRET,{expiresIn: "1d"})
}

const loginUser = async (req,res) => {
    const { email,password } = req.body

    try {
        const user = await User.login(email,password)

        const token = createToken(user._id)

        const name = user.name
        const events = user.events
        let isAdmin = false

        if(email == process.env.ADMIN)
            isAdmin = true

        res.status(200).json({name,email,events,isAdmin,token})

    } catch (error) {
        res.status(400).json({error: error.message})
    }

}

const registerUser = async (req,res) => {
    const { name,email,password } = req.body
    
    try {
        const user = await User.register(name,email,password)

        const token = createToken(user._id)
        const events = user.events
        let isAdmin = false

        res.status(200).json({name,email,events,isAdmin,token})
        
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const updateUserEvents = async (req,res) => {
    console.log(req.body)
    const { email, event_id } = req.body

    try {
        let user = await User.updateOne({email: email}, {$push: {events: event_id}})
        user = await User.findOne({email: email})
        res.status(200).json({user})
        
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

module.exports = { loginUser, registerUser, updateUserEvents }