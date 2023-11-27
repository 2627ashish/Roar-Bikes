const Order = require('../Models/Order');

exports.saveOrderDetails = (req, res) => {
    const { cart,email, firstName, lastName, phNumber, address } = req.body;

    // Check if 'address' is defined before accessing its properties
    const ordersObj = new Order({
        cart:cart,
        email: email,
        firstName: firstName,
        lastName: lastName,
        phNumber: phNumber,
        address: address ? {
            addressLine1: address.addressLine1,
            addressLine2: address.addressLine2,
            town: address.town,
            statename: address.statename,
            postalcode: address.postalcode,
        } : null,
    });

    ordersObj.save()
        .then(response => {
            res.status(200).json({
                message: "Order placed successfully",
                order: response
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};
exports.getOrderDetails = (req, res) => {
    const userId = req.params.userId;
    Order.find({ email: userId })
        .then(response => {
            res.status(200).json({
                message: "Order Details Fetched Successfully",
                Orders: response
            });
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
};

