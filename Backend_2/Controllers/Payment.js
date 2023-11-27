const Razorpay = require('razorpay')
const shortid = require('shortid')
const razorpay = new Razorpay({
	key_id: 'rzp_test_vWSCmoUDCAaJtw',
	key_secret: 'q8dM6v9D5f78ex0sITanbW2x'
})

exports.verification = (req, res) => {
    console.log('verification')
};

exports.razorpay = async (req, res) => {
    const payment_capture = 1
	const amount = 499
	const currency = 'INR'

	const options = {
		amount: amount * 100,
		currency,
		receipt: shortid.generate(),
		payment_capture
	}
    try {
		const response = await razorpay.orders.create(options)
		console.log(response)
		res.json({
			id: response.id,
			currency: response.currency,
			amount: response.amount
		})
	} catch (error) {
		console.log(error)
	}
};