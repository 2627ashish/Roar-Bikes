const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const usersSchema = new Schema ({
    username:{
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    phNumber : {
        type :Number,
        required : true
    },
    address : {
        type :String,
        required : true
    }
})

module.exports = mongoose.model('Users',usersSchema,'users');