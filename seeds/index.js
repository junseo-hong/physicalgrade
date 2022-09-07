const mongoose = require('mongoose');
const descriptions = require('./descriptions');
const Description = require('../models/descriptions');
const Category = require('../models/categories');


const dbUrl = process.env['dbURL']

mongoose.connect(dbUrl);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const seedDB = async () => {
  try {
    await Description.deleteMany({});
    await Category.deleteMany({});
    let i = 0;
    while (descriptions[i]) {
        const des = new Description({
            category: descriptions[i].category,
            content: descriptions[i].content,
            grade: descriptions[i].grade,
        })
        await des.save();
        i++;
    }
        const descriptionsArr = await Description.find({});
        let tempDescriptions = [];
        let categoryClasses = [];
        // *** Use a for-of loop instead of `forEach`
        for (const element of descriptionsArr) {
            tempDescriptions.push(...element.category);
        }
        // *** Remember to declare `categories`
        const categories = [...new Set(tempDescriptions)];

        // *** Removing rudimentary class names from the categories array
        const classes = ["정형외과", "외애과", "내과", "신경과", "신경외과", 
        "흉부외과", "정신건강의학과", "피부과", "성형외과", "이비인후과", "안과", "비뇨기과", "치과"];
        for (const elem of classes) {
          const index = categories.indexOf(elem);
          if (index>-1) {
            categories.splice(index,1);
          }
        }
        // *** Use a for-of loop instead of `forEach`
        for (const element of categories) {
            const description = await Description.findOne({category : element});
            categoryClasses.push(description.category[0]);
        }
        const cate = new Category({
          categoryDescription: categories,
          categoryClass: categoryClasses
        })
        await cate.save();
        } catch (e) {
        // ...send error response...
        res.send(e);
    }
        
}

seedDB().then(() => {
    mongoose.connection.close();
})