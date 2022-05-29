
const express = require('express');

const router = express.Router();
const controller = require('../Controllers/index');

router.get('/login',controller.login);
 router.get('/restaurants',controller.getRestaurants);
 router.get('/restaurants/:city',controller.getRestaurantsByCity);
 router.get('/location',controller.getLocations);
 router.get('/MealType',controller.getMealType); 
router.get('/getCityList',controller.getCityList);
  module.exports = router;
 