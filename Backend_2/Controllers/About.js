const About = require('../Models/About');

exports.getabout=(req,res)=>{
    About.find()
    .then(response =>{
        res.status(200).json({
            message : "Content Fetched Successfully",
            about : response
        })
    })
    .catch(err =>{
        res.status(500).json({
            erroe : err
        })
    })
}