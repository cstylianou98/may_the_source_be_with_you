const Admin = require("../models/admin")
const bcrypt = require("bcrypt")
const Token = require("../models/token")





const AdminLogIn = async (req,res) => {
    try{
        // Storing the data from req.body
        const data = req.body

        //Generate salt with specific cost
        const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS));

        //Hash the password
        const hash = await bcrypt.hash(data.password, salt);
        data.password = hash


        // Check if admin username exists 
        const admin = await Admin.checkAdminUsername(data.username)
       

        // Compare passwords using bcrypt 
        const legit = await bcrypt.compare(admin.password, data.password)

        // Checking if the password is correct
        if (!legit){
            throw new Error ("Admin username and password does not match")
        } else {
            // Create a token
            const token = await Token.createAdmin(admin.admins_id)

            // Sending a response to the client 
            res.status(200).json({token:
            token.token})
            }
    } catch (err){
        res.status(401).json({error: err.message})
    }
}

module.exports = {AdminLogIn}