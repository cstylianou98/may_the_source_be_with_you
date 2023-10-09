const db = require('../database/connect')

class User {
    constructor({users_id, username, password}){
        this.id = users_id;
        this.username = username;
        this.password = password;
    }

    static async checkUsername (username){
        const response = await db.query("SELECT * FROM users WHERE username = $1;", [username])
        if (response.rows.length != 1){
            throw new Error("Unable to locate username!")
        }
        return new User(response.rows[0])
    }

    static async create(data) {
        const {username, password} = data;
        let response = await db.query("INSERT INTO users (username, password) VALUES ($1, $2) RETURNING users_id;", [username, password])        
    }

    
}

module.exports = User