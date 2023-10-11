const Volunteering = require('../models/volunteering')

const allEvent = async(req,res) => {
    try{
        const event = req.params.event
        const result = await Volunteering.getAllFromEvent(event)
        res.status(200).json(result)
    }catch(err){
        res.status(500).json({"error": err.message})
    }
}

const allUser = async(req,res) => {
    try{
        const user = parseInt(req.params.user)
        const result = await Volunteering.getAllVolunteersFromUser(user)
        res.status(200).json(result)
    }catch(err){
        res.status(500).json({"error": err.message})
    }
}

const add = async(req,res) => {
    try{
        const data = req.body
        data.volunteering_type = req.params.event
        const result = await Volunteering.addVolunteer(data)
        res.status(201).json({result: result, message: "You have successfully volunteered. We look forward to seeing you soon"})
    }catch(err){
        res.status(401).json({error: err.message})
    }
}

const destroy = async(req,res) => {
    try {
        const id = parseInt(req.params.id)
        const volunteer = await Volunteering.getById(id)
        const result = await volunteer.destroyVolunteer()
        res.status(204).json(result)
    } catch (err) {
        res.status(404).json({error: err.message})
    }
}

const update = async(req,res) => {
    try {
        const id = parseInt(req.params.id)
        const data = req.body
        const volunteer = await Volunteering.getById(id)
        data.name ||= volunteer.name
        data.email ||= volunteer.email
        data.contact_info ||= volunteer.contact_info
        data.address ||= volunteer.address
        const result = await volunteer.editVolunteer(data)
        res.status(200).json(result)
    } catch (err) {
        res.status(400).json({error: err.message})
    }
}

module.exports =  {allEvent, allUser, add, destroy, update}