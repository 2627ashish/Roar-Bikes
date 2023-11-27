const Items = require('../Models/Item');

exports.getItems = (req,res)=>{
    Items.find()
    .then(response =>{
        res.status(200).json({
            message : "Items Fetched Successfully",
            Items : response
        })
    })
    .catch(err =>{
        res.status(500).json({
            erroe : err
        })
    })
}
exports.allFilter = (req, res) => {
    const { category, lcost, hcost, sort,stock} = req.body;
    const filterObj = {};

    category && (filterObj['category_id'] = {$in:category});
    lcost && hcost && (filterObj['price'] = { $lte: hcost, $gte: lcost });
    // const stockOption={};
    stock && (filterObj['instock']=stock);
    const sortOption = {};
    sort && (sortOption['price'] = sort);
    Items.find(filterObj).sort(sortOption)
        .then(response => {
            res.status(200).json({
                message: "Filter applied successfully",
                bikes: response
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};

exports.getbikesbyBikeId=(req,res)=>{
    const{bikeId}=req.params;
    Items.findById(bikeId)
    .then(response=>{
        res.status(200).json({
            message:"Bikes Feteched Successfully",
            bikes:response
        })
    })
    .catch(err=>{
        res.status(500).json({error:err})
    })
};

