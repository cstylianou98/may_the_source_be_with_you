const {Router} = require('express')

const volunteeringController = require('../controllers/volunteering')

const volunteerRouter = Router()

volunteerRouter.get("/:event", volunteeringController.allEvent)
volunteerRouter.get("/:user", volunteeringController.allUser)
volunteerRouter.post("/", volunteeringController.add)
volunteerRouter.delete("/:id", volunteeringController.destroy)
volunteerRouter.patch("/:id", volunteeringController.update)

module.exports = volunteerRouter