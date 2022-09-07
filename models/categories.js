const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategoriesSchema = new Schema ({
    categoryDescription: {
      type: [String], 
      required: true
    },
    categoryClass : {
      type: [String],
      required: true
    }
})

module.exports = mongoose.model('Categories', CategoriesSchema);