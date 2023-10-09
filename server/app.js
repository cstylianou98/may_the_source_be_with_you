// Importing modules

const express = require("express")
const cors = require("cors")
const db = require("./db")

// For serving static files

const path = require("path")

// Create server

const app = express()

// Middleware 

app.use(express.json())
app.use(cors())

// Exporting the server

module.exports = app