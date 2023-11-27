const Feedback = require('../Models/Feedback');

exports.saveFeedback =(req,res)=>{
    const {firstName,lastName,email,phNumber,city} = req.body;
    const feedobj = new Feedback({
        firstName,
        lastName,
        email,
        phNumber,
        city
    });
    feedobj.save()
    .then(response=>{
        res.status(200).json({
            message:"Tankyou For your Valuable Feddback !",
            feeds:response
        })
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
};