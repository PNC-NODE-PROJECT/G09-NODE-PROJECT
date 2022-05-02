const express = require('express');
const router = express.Router();
// import question model
const userModel = require('../models/user_model');

router.post("/register", (req, res) => {
    if (req.body.username != "" && req.body.password != "" && req.body.email != ""){
        session = req.session;
        userModel.create(req.body)
        .then((ressult) => {
            res.send(ressult);
        })
    }
})
    