// Importing modules 
const fs = require("fs")
require("dotenv").config()
const path = require("path")
const bcrypt = require("bcrypt")

// Link to the database 

const db = require("./connect")

// Load the SQL statements

const sql = fs.readFileSync(path.join(__dirname + "/setup.sql")).toString()

// Hashed admin passwords
// const adminData = [
//     { username: 'constantinos', password: 'stylianou' },
//     { username: 'ishaaq', password: 'baig' }
//   ];

// //Generate salt with specific cost
// const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS));

// //Hash the password
// const hash = await bcrypt.hash(data.password, salt);


// Run the query

db.query(sql)
    .then(data => {
        db.end()
        console.log("Setup is complete")
    })
    .catch(error => console.log(error))
