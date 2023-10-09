const User = require("../models/user")
const bcrypt = require("bcrypt")
const Token = require("../models/token")

const register = async (req,res) => {
    try{
        const {username, password} = req.body

        //Generate salt with specific cost
        const salt = await bcrypt.genSalt(parInt(process.env.BCRYPT_SALT_ROUNDS));

        //Hash the password
        const hash = await bcrypt.hash(password, salt);
        password = hash

        const result = await User.create({username, password})

        res.status(201).send(result)

    } catch (err){
        res.status(401).json({error: err.message})
    }
}

const logIn = async (req,res) => {
    try{
        // Storing the data from req.body
        const {username,password} = req.body

        // Check if username exists 
        const user = await User.checkUsername(username)

        // Compare passwords using bcrypt 
        const legit = await bcrypt.compare(password, user.password)

        // Checking if the password is correct
        if (!legit){
            throw new Error ("Username and password does not match")
        } else {
            // Create a token
            const token = await Token.create(user.users_id)

            // Sending a response to the client 
            res.status(200).json({token:
            token.token})
            }
    } catch (err){
        res.status(401).json({error: err.message})
    }
}

module.exports = { logIn, register}