// Importing modules 
const fs = require("fs")
require("dotenv").config()
const path = require("path")
const db = require("./connect")
const bcrypt = require("bcrypt")

// Link to the database 



// Load the SQL statements

const sql = fs.readFileSync(path.join(__dirname + "/setup.sql")).toString()


// const adminData = [
//     { username: 'constantinos', password: 'stylianou' },
//     { username: 'ishaaq', password: 'baig' },
//     {username: 'bee', password:'vanZyl'}
//   ];


// const hashAdminPasswords = async () => {
//     for (let i = 0; i < adminData.length; i++) {
//       const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS));
//       const hash = await bcrypt.hash(adminData[i].password, salt);


//       const query = await db.query("INSERT into admins (username, password) VALUES ($1, $2);", [adminData[i].username, hash])
//     }
//   }


// Run the query

db.query(sql)
    .then (async (data) =>{
        // await hashAdminPasswords()
        db.end()
        console.log("Setup is complete")
    })
    .catch(error => console.log(error))








