const restaurantList = require("../Models/restaurant.json");
const MealType = require('../Models/MealType')
const city = require('../Models/city');
exports.login = (req, res) => {
    res.status(200).send("welcome");
}

exports.getRestaurants = (req, res) => {
    res.status(200).json({list: restaurantList}); 
}

exports.getRestaurantsByCity = (req,res)=>{
    const city = req.params.city;
    const result = restaurantList.filter(rest => rest.city == city);
    res.status(200).json({list: result }); 
}
exports.getLocations = (req, res) => {
    res.status(200).send("Location List"); 
}

exports.getMealType = (req , res) =>{
    this.getMealType.find().then(result => {
        res.status(200).json({List:result});
    });
}
exports.getCityList = (req , res) => {
    City.find().then(result =>{
        res.status(200).json({CityList: result});
    })
}