const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DescriptionsSchema = new Schema ({
    category: {
      type: [String], 
      required: true
    },
    content: {
      type: String,
      required: true
      },
    grade: {
      type: Number,
      required: true
    }
})



module.exports = mongoose.model('Descriptions', DescriptionsSchema);