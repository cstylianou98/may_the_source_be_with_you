const { Pool } = require('pg');
const fs = require('fs');
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const dotenv = require('dotenv');

dotenv.config();

const resetSql = fs.readFileSync(__dirname + '/reset.sql').toString();

const resetTestDB = async () => {
  const db = new Pool({
    connectionString: process.env.DB_URL
  });

  try {

    await db.query(resetSql);

    // Hash passwords
    const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS));
    const passwords = await db.query("SELECT password FROM users");

    await Promise.all(passwords.rows.map(async (p) => {
      const hash = await bcrypt.hash(p.password, salt);
      await db.query("UPDATE users SET password = $1 WHERE password = $2", [hash, p.password]);
    }))

    // // Insert tokens
    // const token = uuidv4();
    // await db.query("INSERT INTO token (users_id, token) VALUES ($1, $2)", [3, token]);
    // const token2 = uuidv4();
    // await db.query("INSERT INTO token (users_id, token) VALUES ($1, $2)", [5, token2]);
    // const token3 = uuidv4();
    // await db.query("INSERT INTO tokenAdmin (admins_id, token) VALUES ($1, $2)", [3, token3]);

    // Close the database connection
    await db.end();

    return 'Test DB reset';
  } catch (err) {
    // Close the database connection in case of an error
    if (db) {
      db.end();
    }

    throw new Error(`Test DB reset failed: ${err.message}`);
  }
};

module.exports = { resetTestDB };
