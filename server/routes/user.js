const { Router } = require('express')

const userController = require('../controllers/user')

const homeRouter = Router();

homeRouter.post("/register", userController.register)
homeRouter.post("/login", userController.logIn)
// userRouter.post("/logout", userController.)

module.exports = homeRouter