const express = require('express');

const { UserModel } = require("../models/usermodel");

require('dotenv').config();

const userrouter = express.Router();

const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');


userrouter.post("/register", async (req, res) => {

    const { username, email, password } = req.body;

    let find_email =await UserModel.find({ email });

    if (find_email.length > 0) {
        return res.json({ "msg": "Email already Exists" })
    }

    try {
        bcrypt.hash(password, 5, async (err, hashed_password) => {
            if (err) {
                console.log(err)
            } else {
                let user_data = new UserModel({ username, email, password: hashed_password });
                await user_data.save();
                res.json({ "msg": "Successfully registered the user" })
            }
        })
    } catch (error) {
        console.log(error);
        console.log('Error while registering the user')
    }

})


userrouter.post("/login", async (req, res) => {
    const { email, password } = req.body;

    let find_email = await UserModel.find({ email });
    let hashed_password = find_email[0].password;
    try {
        if (find_email.length > 0) {
            bcrypt.compare(password, hashed_password, (err, result) => {
                if (err) {
                    console.log(err)
                } else {
                    let token = jwt.sign({ UserId: find_email[0]._id }, process.env.key);
                    res.json({"msg":"User Successfully logged in","token":token})
                }
            })
        }
    } catch (error) {
        console.log(error);
        console.log('Error while logging the user')

    }
})


module.exports={
    userrouter
}