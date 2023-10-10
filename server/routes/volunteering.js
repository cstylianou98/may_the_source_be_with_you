const {Router} = require('express')

const volunteeringController = require('../controllers/volunteering')

const volunteerRouter = Router()

volunteerRouter.get("/event/:event", volunteeringController.allEvent)
volunteerRouter.get("/user/:user", volunteeringController.allUser)
volunteerRouter.post("/event/:event", volunteeringController.add)
volunteerRouter.delete("/:id", volunteeringController.destroy)
volunteerRouter.patch("/:id", volunteeringController.update)

module.exports = volunteerRouter