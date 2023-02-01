const mongoose = require('mongoose')
const Event = require('../models/eventModel')

const getEvents = async (req,res)=>{
    const events = await Event.find({}).sort({createdAt: -1})
    res.status(200).json(events)
}

const getEvent = async (req,res)=>{
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Invalid ID'})
    }
    
    const event = await Event.findById(id)

    if(!event)
        res.status(404).json({error: 'No such event'})
    else
        res.status(200).json(event)
}

const createEvent = async (req,res)=>{
    const { title,description,timing,participants } = req.body

    try{
        const event = await Event.create({title,description,timing,participants})
        res.status(200).json(event)
    }catch(error){
        return res.status(404).json({error: error.message})
    }
}

const deleteEvent = async (req,res)=>{
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Invalid ID'})
    }
    
    const event = await Event.findOneAndDelete({_id: id})

    if(!event)
        res.status(404).json({error: 'No such event'})
    else
        res.status(200).json(event)
}

const updateEvent = async (req,res)=>{
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Invalid ID'})
    }
    
    const event = await Event.findOneAndUpdate({_id: id},{...req.body})

    if(!event)
        res.status(404).json({error: 'No such event'})
    else
        res.status(200).json(event)
}

module.exports = {
    getEvent,getEvents,createEvent,deleteEvent,updateEvent
}