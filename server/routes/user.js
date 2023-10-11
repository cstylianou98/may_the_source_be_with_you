const { Router } = require('express')

const authenticator = require('../middleware/authenticator')
const userController = require('../controllers/user')

const homeRouter = Router();

homeRouter.post("/register", userController.register)
homeRouter.post("/login", userController.logIn)
homeRouter.delete("/logout", userController.logOut)
homeRouter.get("/",authenticator,(req,res)=>{res.sendStatus(200)})

module.exports = homeRouter