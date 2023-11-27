const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PartsSchema = new Schema ({
    name:{
        type : String,
        required : true
    }
   
})

module.exports = mongoose.model('parttypes',PartsSchema,'parts');