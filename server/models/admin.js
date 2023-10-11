const db = require('../database/connect')

class Admin {
    constructor({admins_id, username, password}){
        this.admins_id = admins_id;
        this.username = username;
        this.password = password;
    }

    static async checkAdminUsername (username){
        const response = await db.query("SELECT * FROM admins WHERE username = $1;", [username])
        if (response.rows.length != 1){
            throw new Error("Unable to locate admin username!")
        }
        return new Admin(response.rows[0])
    }
    
}

module.exports = Admin