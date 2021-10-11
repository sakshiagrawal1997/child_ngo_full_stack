const mongoose = require('mongoose');

const childSchema = new mongoose.Schema(
    {
      name: String,
      sex: String,
      dateOfBirth: Date,
      fatherName: String,
      motherName: String,
      state: String,
      district: String,
      imgName: String
    }
);

module.exports = mongoose.model('Child', childSchema, 'ChildDB')