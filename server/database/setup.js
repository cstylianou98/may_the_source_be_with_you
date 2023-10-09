// Importing modules 

const fs = require("fs")
const dotenv = require("dotenv").config()

// Link to the database 

const db = require("./db")

// Load the SQL statements

const sql = fs.readFileSync("setup.sql").toString()

// Run the query

db.query(sql)
    .then(data => console.log("Setup is complete"))
    .catch(error => console.log(error))
