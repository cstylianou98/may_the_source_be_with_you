// Import Pool class from pg 

const { Pool } = require("pg")

// Connect to the database 

const db = new Pool({
    connectionString: process.env.DB_URL
})

// Exporting db

module.exports = db