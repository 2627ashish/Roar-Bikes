const Locations = require('../Models/Locations');

exports.getLocation = (req,res)=>{
    Locations.find()
    .then(response =>{
        res.status(200).json({
            message : "Locations Fetched Successfully",
            locations : response
        })
    })
    .catch(err =>{
        res.status(500).json({
            erroe : err
        })
    })
}