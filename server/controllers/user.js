import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js'

export const signIn = async(req, res) =>{
    const {email, password} = req.body  

    try {
        const existingUser = await User.findOne({ email });

        if(!existingUser){
            return res.status(404).send("No User")
        }
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)
        if(!isPasswordCorrect) return res.status(404).send("Invalid Credentials")

        const token = jwt.sign({email: existingUser.email, id: existingUser._id}, 'test', {expiresIn: "1h"})
        res.status(200).json({result : existingUser, token})

    } catch (error) {
        res.status(500).send(error)
    }
}

export const signUp = async(req, res) =>{
    const {email, password, firstname, lastname, confirmPassword} = req.body;

    try {
        const existingUser = await User.findOne({email})
        if(existingUser) return res.status(404).send("User is already registered!")

        if(password !== confirmPassword) return res.status(404).send("password dont match!")

        const hashApassword = await bcrypt.hash(password, 12);

        const result = await User.create({email, password : hashApassword, name: `${firstname} ${lastname}`})
        const token = jwt.sign({email: result.email, id: result._id}, 'test', {expiresIn: "1h"})
        res.status(200).json({ result, token }) 

    } catch (error) {
        res.status(500).send(error)
    }

}