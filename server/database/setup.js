// Importing modules 
const fs = require("fs")
require("dotenv").config()
const path = require("path")

// Link to the database 

const db = require("./connect")

// Load the SQL statements

const sql = fs.readFileSync(path.join(__dirname + "/setup.sql")).toString()

// Run the query

db.query(sql)
    .then(data => console.log("Setup is complete"))
    .catch(error => console.log(error))
