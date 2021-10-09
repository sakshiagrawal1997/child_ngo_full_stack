const mongoose = require('mongoose');

const districtSchema = new mongoose.Schema(
    {
      stateName: String,
      districtName: String,
      districtNumber: Number
    }
);

module.exports = mongoose.model('District', districtSchema, 'DistrictDB')