// Colt's reference github : 
// https://github.com/Colt/YelpCamp/tree/3ef5c4ca6aae9243b28167db3c3fb0665c3ea46a
const Description = require('./models/descriptions')
const Category = require('./models/categories')
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const session = require('express-session')
const MongoStore = require('connect-mongo');

const app = express();


app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

const dbUrl = process.env['dbURL']

app.use(
  session({
    saveUninitialized: false,
    secret: 'notagoodscret',
    resave: false,
    store: MongoStore.create({mongoUrl: dbUrl, ttl: 24*60*60} )
  })
);

mongoose.connect(dbUrl);

function getBMI(weight, height) {
  const denominator = Math.pow((height/100),2);
  const tempBmiVal = weight/denominator;
  const bmiVal = Math.floor(tempBmiVal * 10)/10;
  return bmiVal; 
}

function calculateGrade(weight,height,bmi) {
  if (height<=140) {
    grade = 6;
  }
  else if (height>140 && height<146) {
    grade = 5;
  }
  else if ((height>=146 && height<159) || height>=204 || (bmi<16 || bmi>=35)) {
    grade = 4;
  }
  else if ( ((height>=159 && height<161) && (bmi>=16 && bmi<=34.9)) || ((bmi>=16 && bmi<=18.4) || (bmi>=30 && bmi<=34.9)) ) {
    grade = 3;
  }
  else if ( (bmi>=18.5 && bmi<=19.9) || (bmi >=25.0 && bmi<=29.9)) {
    grade = 2;
  }
  else {
    grade = 1;
  }

  return grade; 
}


app.get('/', async (req, res) => {
  const cate = await Category.findOne({});
  const categories = cate.categoryDescription;
  const categoryClasses = cate.categoryClass; 
  res.render("home", { categories, categoryClasses });
});

app.post('/',  async(req,res) => {
  req.session.categories = req.body.selectedCategories;
  req.session.height = req.body.BMI.height;
  req.session.weight = req.body.BMI.weight; 
  res.redirect('/result')
});

app.get('/result', async (req,res) => {
  
  const resultDescriptions = [];
  const allGrades = [];
  const bmi = getBMI(req.session.weight,req.session.height);
  const bmiGrade = calculateGrade(req.session.weight,req.session.height,bmi);
  let categorySelected = true;
  if (!req.session.categories){
    req.session.categories = [];
    categorySelected = false;
  }
  else if (typeof req.session.categories === "string"){
    const tempdes = await Description.find({category : req.session.categories});
    resultDescriptions.push(...tempdes);
    for (const temp of tempdes) 
      allGrades.push(temp.grade); }
  else {
  for (const inputCategory of req.session.categories) {
    const tempdes = await Description.find({category : inputCategory});
    resultDescriptions.push(...tempdes);
    for (const temp of tempdes) {
      allGrades.push(temp.grade);
    }
  }}
  allGrades.push(bmiGrade);
  const distinctAllGrades = [...new Set(allGrades)];
  const possibleGrades = distinctAllGrades.filter(function(x) {
    return x >= bmiGrade;
});
  possibleGrades.sort();

  const height = req.session.height; 
  const weight = req.session.weight;
  res.render("result", {resultDescriptions, bmi, bmiGrade, height, weight, possibleGrades, categorySelected});
});


app.listen(3000, () => {
  console.log('server started');
});




