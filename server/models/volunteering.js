const db = require('../database/connect')

class Volunteering {
    constructor({volunteering_id,users_id,name,email,contact_info,address,volunteering_type}){
        this.volunteering_id = volunteering_id
        this.users_id = users_id
        this.name = name
        this.email = email
        this.contact_info = contact_info
        this.address = address
        this.volunteering_type = volunteering_type
    }
    static async getById(id){
        const response = await db.query("SELECT * FROM volunteering WHERE volunteering_id = $1;", [id])
        if (response.rows.length != 1){
            throw new Error("Unable to locate volunteering instance")
        }
        return new Volunteering(response.rows[0])
    }

    static async getAllFromEvent(type){
        const responses = await db.query("SELECT * FROM volunteering WHERE volunteering_type = $1;",[type])
        if(responses.rows.length === 0){
            throw new Error("No volunteers for that event")
        }
        return responses.rows.map(v => new Volunteering(v))
    }

    static async getAllVolunteersFromUser(users_id){
        const responses = await db.query("SELECT * FROM volunteering WHERE users_id = $1;",[users_id])
        if(responses.rows.length === 0){
            throw new Error("User hasn't volunteered")
        }
        return responses.rows.map(v => new Volunteering(v))
    }

    static async addVolunteer(data){
        const {users_id,name,email,contact_info,address,volunteering_type} = data
        const response = await db.query("INSERT INTO volunteering (users_id, name, email, contact_info, address, volunteering_type) VALUES ($1, $2, $3, $4, $5, $6);",[users_id,name,email,contact_info,address,volunteering_type])
    }

    async destroyVolunteer(){
        const response = await db.query("DELETE FROM volunteering WHERE volunteering_id = $1 RETURNING *;",[this.volunteering_id])
        if(response.rows.length != 1){
            throw new Error("Couldn't delete volunteer instance")
        }
        return new Volunteering(response)
    }

    async editVolunteer(data) {
        const {name,email,contact_info,address} = data
        const response = await db.query("UPDATE volunteering SET name = $1, email  = $2, contact_info = $3, address = $4 WHERE volunteering_id = $5 RETURNING *;",[name,email,contact_info,address,this.volunteering_id])
        if(response.rows.length != 1){
            throw new Error("Couldn't update volunteer instance")
        }
        return new Volunteering(response)
    }
}

module.exports = Volunteering