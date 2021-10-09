const express = require('express');
const router = express.Router();
const Child = require('../models/Child');

/**
 * Creation of Child using POST method
 */
 router.post('/add', function(req, res){
    console.log(req.body);
    const child = new Child(req.body);
    child.save(function(err){
        if(err) {
            console.log("err", err);
            res.status(400).send({
                message: err,
             });
        } else {
            res.send("Child added successfully");
        }
    });
});
/**
 * Get All data using GET method
 */
 router.get('/getAll', function(req, res){
    Child.find({}, { __v: 0 }, function(err,data){
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