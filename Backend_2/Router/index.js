const express = require('express');

const route = express.Router();

const locationController = require('../Controllers/Locations');
const UsersController = require('../Controllers/Users');
const feedBackController = require('../Controllers/Feedback');
const parttypescontoller =require('../Controllers/Partype');
const orderController = require('../Controllers/Order');
const aboutController = require('../Controllers/About');
const itemsController = require('../Controllers/Item');
const categoryController=require('../Controllers/Category');
const paymentGatewayController = require('../Controllers/Payment');

route.get('/locations', locationController.getLocation);
route.post('/userlogin',UsersController.userLogin);
route.get('/items',itemsController.getItems);
route.post('/userSignUp',UsersController.userSignUp);
route.post('/saveOrder',orderController.saveOrderDetails);
route.get('/getOrders/:userId',orderController.getOrderDetails);
route.post('/feedBack',feedBackController.saveFeedback);
route.get('/parttypes', parttypescontoller.getparttyes);
route.get('/about',aboutController.getabout);
route.get('/category/:cid',categoryController.getCategoryByid);
route.post('/filter',itemsController.allFilter);
route.post('/verification', paymentGatewayController.verification);
route.post('/razorpay', paymentGatewayController.razorpay);
route.get('/bikes/:bikeId',itemsController.getbikesbyBikeId);
// route.post('/filter',parttypescontoller.partsFilter);
module.exports = route;