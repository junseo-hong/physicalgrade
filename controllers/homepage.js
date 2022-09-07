const Description = require('../models/descriptions');

module.exports.makeArrays = async(req,res) => {
const 정형외과 = await Description.find({category: "정형외과"});
const 외과 = await Description.find({category: "외과"});
const 내과 = await Description.find({category: "내과"});
const 신경과 = await Description.find({category: "신경과"});
const 신경외과 = await Description.find({category: "신경외과"});
const 흉부외과 = await Description.find({category: "흉부외과"});
const 정신건강의학과 = await Description.find({category: "정신건강의학과"});
const 피부과 = await Description.find({category: "피부과"});
const 성형외과 = await Description.find({category: "성형외과"});
const 이비인후과 = await Description.find({category: "이비인후과"});
const 안과 = await Description.find({category: "안과"});
const 비뇨기과 = await Description.find({category: "비뇨기과"});
const 치과 = await Description.find({category: "치과"});

}






    const descriptions = await Description.find({});
    let tempDescriptions = [];
    descriptions.forEach(element => tempDescriptions.push(...element.category));
    categories = [...new Set(tempDescriptions)]
    res.render('home', { categories })