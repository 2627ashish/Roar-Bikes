const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const aboutSchema = new Schema ({
    content:{
        type : String,
        required : true
    }
})

module.exports = mongoose.model('about',aboutSchema,'about');