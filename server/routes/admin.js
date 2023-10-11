const { Router } = require('express')

const adminController = require('../controllers/admin')

const adminRouter = Router();

adminRouter.post("/admin", adminController.AdminLogIn)

module.exports = adminRouter