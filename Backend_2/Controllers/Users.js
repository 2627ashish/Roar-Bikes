const Users = require('../Models/Users');

exports.userLogin = (req, res) => {
    const { user, pwd } = req.body;
    Users.find({
        username: user,
        password: pwd
    })
        .then(response => {
            let msg, auth;
            if (response.length == 0) {
                msg = "User not Authenticated Successfully",
                    auth = false
            }
            else {
                msg = "User Authenticated Successfully",
                    auth = true
            } res.status(200).json({
                message: msg,
                user: response,
                isAuthenticated: auth

            })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}

exports.userSignUp = (req, res) => {
    const { user, pwd, fn, ln,ph,add } = req.body;
    const userObj = new Users({
        username: user,
        password: pwd,
        firstName: fn,
        lastName: ln,
        phNumber:ph,
        address:add
    });
    Users.find({
        username: user
    })
        .then(response => {
            if (response.length == 0) {
                userObj.save()
                    .then(response => {
                        res.status(200).json({
                            message: "User Added Successfully",
                            user: response
                        })
                    })
            }
            else {
                res.status(200).json({
                    message : "User Already Exists"
                })
            }
        })
        .catch(err => {
            req.status(500).json({ error: err })
        })
}