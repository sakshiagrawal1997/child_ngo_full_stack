const express = require('express');
const router = express.Router();
const District = require('../models/District');

/**
 * Creation of District using POST method
 */
 router.post('/add', function(req, res){
    console.log(req.body);
    const district = new District(req.body);
    district.save(function(err){
        if(err) {
            console.log("err", err);
            res.status(400).send({
                message: err,
             });
        } else {
            res.send("District added successfully");
        }
    });
});
/**
 * Get All data using GET method
 */
 router.get('/getAll', function(req, res){
    District.find({}, { __v: 0 }, function(err,data){
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