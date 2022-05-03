const express = require('express');
const router = express.Router();
// import question model
const userModel = require('../models/user_model');


router.get("/user/:id", (req, res) => {
    userModel.find({_id:req.params.id})
    .then((result)=>{
        res.send(result);
    })
})


router.get("/login", (req, res) => {
    userModel.find()
    .then((result)=>{
        res.send(result);
    })
})


router.post("/register", (req, res) => {
if (req.body.username != "" && req.body.password != "" && req.body.email != ""){
    session = req.session;
    userModel.create(req.body)
    .then((ressult) => {
        res.send(ressult);
    })
}
})

router.patch("/score/:id",(req, res)=>{
    userModel.updateOne({_id: req.params.id},{userScore: req.body.score})
    .then((result)=>{
        res.status(200).send(result);
    })
})


module.exports = router;