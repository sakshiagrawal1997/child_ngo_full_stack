const mongoose = require('mongoose');

const stateSchema = new mongoose.Schema(
    {
      stateName: String,
      stateNumber: Number
    }
);



module.exports = mongoose.model('State', stateSchema, 'StateDB')