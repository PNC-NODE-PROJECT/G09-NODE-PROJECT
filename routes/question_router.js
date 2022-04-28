const express = require('express');
const router = express.Router();

// import question model
const questionModel = require('../models/model');


//  get all question route
router.get('/questions', (req, res) => {
    questionModel.find()
    .then((result) => {
        res.send(result);
    })
})

//  create question route
router.post('/create', (req, res) => {
    questionModel.create(req.body)
    .then((result) => {
        res.status(201).send(result);  
    })
})



module.exports = router;