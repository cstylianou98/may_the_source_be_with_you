// Importing modules

const express = require("express")
const cors = require("cors")

// Importing routers

const homeRouter = require("./routes/user")
const adminRouter = require("./routes/admin")
const volunteerRouter = require("./routes/volunteering")

// For serving static files

const path = require("path")


// Create server

const app = express()

// Middleware 

app.use(express.json())
app.use(cors())

// Using the routers 

app.use("/volunteer", volunteerRouter)
app.use("/", homeRouter)
app.use("/", adminRouter)

// Exporting the server

module.exports = app