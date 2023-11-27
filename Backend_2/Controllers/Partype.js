const { response } = require('express');
const parttypes = require('../Models/Parttype');

exports.getparttyes=(req,res)=>{
    parttypes.find()
    .then(response=>{
        res.status(200).json({
            message:"Pats Fetched",
            pats:response
        })
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
}

exports.partsFilter=(req,res)=>{
    let{category,lcost, hcost, sort, page }=req.body;
    sort = sort?sort:1;
    page=page?page:1;
    const itemsperpage=2;
    let startIndex,endIndex;
    let filterobj={};
    category&&(filterobj['category_id']=category);
    lcost && hcost && (filterobj['min_price']={$lte:hcost,$gte:lcost});
    parttypes.find(filterobj).sort({min_price:sort})
    .then(response=>{
        startIndex = page * itemsperpage - itemsperpage;
            endIndex = page * itemsperpage;
            const filterResponse = response.slice(startIndex, endIndex);
            let arr = [];
            for (let i = 1; i <= Math.ceil(response.length / itemsperpage); i++) {
                arr.push(i);
            }
            res.status(200).json({
                message: "Filter applied Successfully",
                pattypes: filterResponse,
                currentPage: page,
                pageCount : arr
            })
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })
};
