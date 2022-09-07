const Description = require('../models/descriptions');

module.exports.calculateBMI = async(req,res) => {
  console.log(req.body)
  const denominator = Math.pow((req.body.BMI.height/100),2)
  //console.log(denominator)
  const bmiVal = req.body.BMI.weight/denominator
  //console.log(bmiVal)
}

module.exports.checkHW = async(req,res) => {
  const height = req.body.BMI.height
  const weight = req.body.BMI.weight

  if (height<=140.0) {
    grade = 6
  }
  else if (height>140.0 && height<=146.0) {
    grade = 5
  }
  else if (height>140.0 && height<146.0) {
    grade = 5
  }
  else if (height<159.0 && height>=146.0) {
    grade = 4
  }
  else if (height>140.0 && height<=146.0) {
    grade = 5
  }
  else if (height>140.0 && height<=146.0) {
    grade = 5
  }
  
}

module.exports.getSelectedDescriptions = async(req,res) => {
  let includedList = []
  const inputCategories = req.body.selectedCategories 
  //const descriptions = await Description.find({ "category": inputCategories })
  console.log(descriptions)
}