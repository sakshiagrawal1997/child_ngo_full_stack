const express = require('express');
const router = express.Router();
const State = require('../models/State');
const verify = require('./verifyToken');
/**
 * Creation of State using POST method
 */
router.post('/add',verify, function(req, res){
    console.log(req.body);
    const stateName = new State(req.body);
    stateName.save(function(err){
        if(err) {
            console.log("err", err);
            res.status(400).send({
                message: err,
             });
        } else {
            res.send("States added successfully");
        }
    });
});
/**
 * Get All data using GET method
 */
router.get('/getAll',verify, function(req, res){
    State.find({}, { __v: 0 }, function(err,data){
        if(err) {
            console.log("err", err);
            res.status(400).send({
                message: err,
             });
        } else {
            res.send({results: data});
        }
    });
});

module.exports = router;