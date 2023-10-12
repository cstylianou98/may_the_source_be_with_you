const { Pool } = require('pg');
const fs = require('fs');
const bcrypt = require("bcrypt")
const { v4: uuidv4 } = require("uuid");
const db = require('../../../server/database/connect')

const dotenv = require('dotenv')
dotenv.config()


const reset = fs.readFileSync(__dirname + '/reset.sql').toString();

const resetTestDB = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const db = new Pool({
        connectionString: process.env.DB_URL
      });
      await db.query(reset)
      try {
        const passwords = await db.query("SELECT password FROM users")

        const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS));
        
        passwords.rows.map(async p => {
            console.log(p.password)
            const hash = await bcrypt.hash(p.password,salt);
            await db.query("UPDATE users SET password = $1 WHERE password = $2;",[hash,p.password]) 
        });
      } catch (err) {
        // reject('Could not hash passwords')
        reject(err.message)
      }
      try{
        // const result = await Token.create("3")
        // result = await Token.create("5")
        // result = await Token.createAdmin("3")
        let token = uuidv4();
        await db.query("INSERT INTO token (users_id, token) VALUES ($1, $2);",
        [3, token]);
        console.log(3)
        token = uuidv4();
        await db.query("INSERT INTO token (users_id, token) VALUES ($1, $2);",
        [5, token]);
        token = uuidv4();
        await db.query("INSERT INTO tokenAdmin (admins_id, token) VALUES ($1, $2);",
        [3, token]);
      }catch(err){
        // reject('Could not make tokens')
        reject(err.message)
      }
      resolve('Test DB reset')
    } catch (err) {
        // reject('Could not reset TestDB')
        reject(err.message)
    }
  })
}

module.exports = { resetTestDB }