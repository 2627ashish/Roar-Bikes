require('dotenv').config();
const formidable = require('formidable');
const { v4: uuidv4 } = require('uuid');
const https = require('https');
const PaytmChecksum = require('./PaytmChecksum');
const express = require('express');
const router = express.Router();

exports.payment = (req, res) => {
    const { amount, email } = req.body;

    // Import checksum generation utility
    const totalAmount = JSON.stringify(amount);
    const params = {
        'MID': process.env.PAYTM_MID,
        'WEBSITE': process.env.PAYTM_WEBSITE,
        'CHANNEL_ID': process.env.PAYTM_CHANNEL_ID,
        'INDUSTRY_TYPE_ID': process.env.PAYTM_INDUSTRY_TYPE_ID,
        'ORDER_ID': uuidv4(),
        'CUST_ID': process.env.PAYTM_CUST_ID,
        'TXN_AMOUNT': totalAmount,
        'CALLBACK_URL': 'http://localhost:9992/callback',
        'EMAIL': email,
        'MOBILE_NO': process.env.MOBILE_NUMBER
    };

    console.log(params);

    // Generate checksum
    const paytmChecksum = PaytmChecksum.generateSignature(params, process.env.PAYTM_MERCHANT_KEY);
    console.log(paytmChecksum)
    paytmChecksum.then(function (checksum) {
        const paytmParams = {
            ...params,
            "CHECKSUMHASH": checksum
        };
        res.json(paytmParams);
    }).catch(function (error) {
        console.log(error);
    });
};


// exports.callback = (req, res) => {
//     const form = new formidable.IncomingForm();
//     form.parse(req, (err, fields, file) => {
//         const paytmChecksum = fields.CHECKSUMHASH;
//         delete fields.CHECKSUMHASH;
//         console.log('Received fields:', fields);
//         console.log('Received checksum:', paytmChecksum);
//         var isVerifySignature = PaytmChecksum.verifySignature(fields, process.env.PAYTM_MERCHANT_KEY, paytmChecksum);
//         console.log('isVerifySignature:', isVerifySignature);
//         if (isVerifySignature) {
//             var paytmParams = {};
//             paytmParams["MID"] = fields.MID;
//             paytmParams["ORDERID"] = fields.ORDERID;

//             /*
//             * Generate checksum by parameters we have
//             * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys 
//             */
//             PaytmChecksum.generateSignature(paytmParams, process.env.PAYTM_MERCHANT_KEY).then(function (checksum) {
//                 paytmParams["CHECKSUMHASH"] = checksum;

//                 var post_data = JSON.stringify(paytmParams);
//                 var options = {
//                     hostname: 'securegw-stage.paytm.in',
//                     port: 443,
//                     path: '/order/status',
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'Content-Length': post_data.length
//                     }
//                 };

//                 var response = "";
//                 var post_req = https.request(options, function (post_res) {
//                     post_res.on('data', function (chunk) {
//                         response += chunk;
//                     });
//                     post_res.on('end', function () {
//                         let parsedResponse = JSON.parse(response);
//                         if (parsedResponse['STATUS'] == "TXN_SUCCESS") {
//                             res.sendFile(__dirname + '/success.html');
//                         }
//                         else {
//                             res.sendFile(__dirname + '/faliure.html');
//                         }
//                     });
//                 });
//                 post_req.write(post_data);
//                 post_req.end();
//             });
//         } else {
//             console.log("Checksum Mismatched");
//         }
//     })
// }

exports.callback = (req, res) => {
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, file) => {
        const paytmChecksum = fields.CHECKSUMHASH;
        delete fields.CHECKSUMHASH;

        var isVerifySignature = PaytmChecksum.verifySignature(fields, process.env.PAYTM_MERCHANT_KEY, paytmChecksum);
        if (isVerifySignature) {
            var paytmParams = {};
            paytmParams["MID"] = fields.MID;
            paytmParams["ORDERID"] = fields.ORDERID;

            /*
            * Generate checksum by parameters we have
            * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys 
            */
            PaytmChecksum.generateSignature(paytmParams, process.env.PAYTM_MERCHANT_KEY).then(function (checksum) {
                paytmParams["CHECKSUMHASH"] = checksum;

                var post_data = JSON.stringify(paytmParams);
                var options = {
                    hostname: 'securegw-stage.paytm.in',
                    port: 443,
                    path: '/order/status',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Content-Length': post_data.length
                    }
                };

                var response = "";
                var post_req = https.request(options, function (post_res) {
                    post_res.on('data', function (chunk) {
                        response += chunk;
                    });

                    post_res.on('end', function () {
                        res.json(response)
                    });
                });

                post_req.write(post_data);
                post_req.end();
            });
        } else {
            console.log("Checksum Mismatched");
        }
    })
}