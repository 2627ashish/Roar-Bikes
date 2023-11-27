const Category=require('../Models/Category');
exports.getCategoryByid = (req, res) => {
    const cid = req.params.cid;
    Category.find({category_id: cid })
        .then(response => {
            res.status(200).json({
                message: "Categories Fetched Successfully",
                Category: response
            })
        })
        .catch(err => {
            res.status(500).json({
                erroe: err
            })
        })
};