import React, { useState, useEffect } from 'react';
import '../Styles/checkout.css';
import axios from 'axios';
import userEvent from '@testing-library/user-event';

const Checkout = (props) => {
    const [cart, setCart] = useState(props.location.state.Cart);
    const [isLoggedIn,setLoggedIn]=useState(props.location.state.isLoggedIn);
    const [userid,setuserid]=useState(props.location.state.username);
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [states, setStates] = useState([]);
    const [subtotal, setSubtotal] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');
    const [uname, setUname] = useState('');
    const [fname, setFname] = useState(undefined);
    const [lname, setLname] = useState(undefined);
    const [cname, setCname] = useState(undefined);
    const [country, setCountry] = useState(undefined);
    const [email, setEmail] = useState(undefined);
    const [addressline1, setAddressline1] = useState(undefined);
    const [addressline2, setAddressline2] = useState(undefined);
    const [town, setTown] = useState(undefined);
    const [statename, setStatename] = useState(undefined);
    const [postalcode, setPostalcode] = useState(undefined);
    const [phonenumber, setPhonenumber] = useState(undefined);
    const [greetmsg, setGreetmsg] = useState(undefined);
    const [res, setRes] = useState(null);
    const [paymentObjectClosed, setPaymentObjectClosed] = useState(false)
    useEffect(() => {
        axios
            .get('https://restcountries.com/v3.1/all')
            .then((response) => {
                setCountries(response.data);
            })
            .catch((error) => {
                console.error('Error fetching countries:', error);
            });

        updateSubtotal();
        loadRazorpayScript();
    },[isLoggedIn, uname,userid]);

    useEffect(() => {
        if (isLoggedIn&& !uname) {
            const userEmail = userid; // Replace with your logic to get the user's email
            setUname(userEmail);
        }
        console.log(userid);
        if (selectedCountry) {
            fetchStatesForCountry(selectedCountry);
        }
    }, [selectedCountry,isLoggedIn, uname,userid]);

    useEffect(() => {
        if (res) {
            displayRazorpay();
        }
    }, [res]);

    const handleInputChange = (stateSetter, event) => {
        stateSetter(event.target.value);
    };

    const updateSubtotal = () => {
        const newSubtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
        setSubtotal(newSubtotal);
    };

    const fetchStatesForCountry = (countryCode) => {
        const manualMappings = {
            IN: ['Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'],
            // Add more entries for other countries as needed
        };
        const manualStates = manualMappings[countryCode];

        axios
            .get(`https://restcountries.com/v3.1/alpha/${countryCode}`)
            .then((response) => {
                if (manualStates) {
                    setStates(manualStates);
                    setErrorMessage('');
                } else {
                    const states = response.data[0]?.subdivisions ? Object.keys(response.data[0].subdivisions) : [];
                    setStates(states);
                    setErrorMessage('');
                }
            })
            .catch((error) => {
                console.error('Error fetching states:', error);
                setErrorMessage('Error fetching states. Please try again.');
            })
            .finally(() => {
                // Display the error message for 2 seconds
                setTimeout(() => {
                    setErrorMessage('');
                }, 2000);
            });
    };
   
    const displayRazorpay = async () => {
        if (uname == '') {
            alert("please enter a valid emain id");
        }
        else {
            try {
                const { data } = await axios.post('http://localhost:9992/razorpay');
                console.log(data);

                const options = {
                    key: 'rzp_test_vWSCmoUDCAaJtw',
                    amount: subtotal*100,
                    currency: 'INR',
                    name: 'Roar Cycles',
                    description: 'Thank you for shopping with us! Come again',
                    handler: function (response) {
                        alert(response.razorpay_payment_id);
                        alert(response.razorpay_order_id);
                        alert(response.razorpay_signature);
                    },
                    prefill: {
                        name: 'Gaurav Kumar',
                        email: 'gaurav.kumar@example.com',
                        contact: '9000090000',
                    },
                };

                const paymentObject = new window.Razorpay(options);
                paymentObject.open();
            } catch (error) {
                console.error('Error fetching Razorpay data:', error);
                // Handle the error appropriately, e.g., show an error message to the user
            }
        }
    };
    const handlePayment = async () => {
        if (uname === '') {
            alert('Please enter a valid email id');
        } else if (fname === '' || lname === '' || phonenumber === '' || addressline1 === '' || selectedCountry === '' || town === '' || statename === '' || postalcode === '') {
            alert('Please fill in all the required fields');
        // } else if (!isValidEmail(uname)) {
        //     alert('Please enter a valid email address');}
        }else {
            try {
                const { data } = await axios.post('http://localhost:9992/razorpay');
                console.log(data);
    
                const options = {
                    key: 'rzp_test_vWSCmoUDCAaJtw',
                    amount: subtotal * 100,
                    currency: 'INR',
                    name: 'Roar Cycles',
                    description: 'Thank you for shopping with us! Come again',
                    handler: function (response) {
                        // Check if the logic has already been executed
                        if (!paymentObjectClosed) {
                            alert(response.razorpay_payment_id);
                            alert(response.razorpay_order_id);
                            alert(response.razorpay_signature);
    
                            // Close the Razorpay payment dialog
                            paymentObject.close();
                            // Set the flag to indicate that the logic has been executed
                            setPaymentObjectClosed(true);
    
                            // Make the API call to save the order details
                            saveOrderDetails();
                            
                            // Redirect to the home page
                            props.history.push('/');
                        }
                    },
                    prefill: {
                        name: `${fname} ${lname}`,
                        email: uname,
                        contact: phonenumber,
                    },
                };
    
                const paymentObject = new window.Razorpay(options);
                // Initialize the flag to false
                let paymentObjectClosed = false;
    
                paymentObject.open();
            } catch (error) {
                console.error('Error fetching Razorpay data:', error);
                // Handle the error appropriately, e.g., show an error message to the user
            }
        }
    };
    
    const isValidEmail = (email) => {
        // Implement your email validation logic here
        // You can use a regular expression or any other method to validate the email format
        // For example:
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    
    const saveOrderDetails = () => {
        const orderObj = {
            cart:cart,
            email: uname,
            firstName: fname,
            lastName: lname,
            phNumber: phonenumber,
            address: {
                addressLine1: addressline1,
                addressLine2: addressline2,
                town,
                statename,
                postalcode,
            },
        };
    
        axios.post('http://localhost:9992/saveOrder', orderObj)
            .then(response => {
                alert(response.data.message);
            })
            .catch(error => {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.error("Server responded with an error status:", error.response.status);
                    console.error("Error response data:", error.response.data);
                } else if (error.request) {
                    // The request was made but no response was received
                    console.error("No response received from the server.");
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.error("Error setting up the request:", error.message);
                }
            });
    };
    
    
    
    useEffect(() => {
        loadRazorpayScript();
    }, []);
    const loadRazorpayScript = () => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';

        script.onload = () => {
            console.log('Razorpay script loaded successfully');
            // You may want to set some state to indicate that the script has loaded, if needed
        };

        script.onerror = () => {
            console.error('Error loading Razorpay script');
            // Handle the error appropriately, e.g., show an error message to the user
        };

        document.body.appendChild(script);
    };

    const handleNavigatehome = () => {
        props.history.push(`/`);
    };

    return (
        <div>
            <div className="logo">
                <a onClick={handleNavigatehome}>
                    <img src="./Assets/logo-roar-bikes.png" alt="logo supposed" />
                </a>
            </div>
            <div className="container">
                <div className="cont-back">
                    <div className="check-head">Checkout</div>
                    <div className="row">
                        <div className="col-7">
                            <div className='bill-headings'>Customer information</div>
                            <div>
                                <input type="text" className='bigtextboxes' placeholder="Email Address *" value={uname} onChange={(event) => handleInputChange(setUname, event)} />
                            </div>
                            <div className='bill-headings'>Billing Details</div>
                            <div>
                                <input type="text" className='bigtextboxes-half' placeholder="First name *" onChange={(event) => handleInputChange(setFname, event)} />
                                <input type="text" className='bigtextboxes-half' placeholder="Last name *" onChange={(event) => handleInputChange(setLname, event)} />
                            </div>
                            <div>
                                <input type="text" className='bigtextboxes' placeholder="Company name" onChange={(event) => handleInputChange(setCname, event)} />
                            </div>
                            <div>
                                <select id="countries" className='bigtextboxes' onChange={(e) => {
                                    const selectedCountry = e.target.value;
                                    handleInputChange(setCountry, e);
                                    setSelectedCountry(selectedCountry);
                                }}
                                >
                                    <option value="">Select</option>
                                    {countries.map((country) => (
                                        <option key={country.cca2} value={country.cca2}>
                                            {country.name.common}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <input type='text' className='bigtextboxes-half' placeholder='street address *' onChange={(event) => handleInputChange(setAddressline1, event)}></input>
                                <input type='text' className='bigtextboxes-half' placeholder='address line 2' onChange={(event) => handleInputChange(setAddressline2, event)}></input>
                            </div>
                            <div>
                                <input type='text' className='bigtextboxes-thrice' placeholder='Town/City *' onChange={(event) => handleInputChange(setTown, event)}></input>
                                <select className='bigtextboxes-thrice' id="countries" onChange={(event) => handleInputChange(setStatename, event)}>
                                    <option value="">Select</option>
                                    {states.map((state, index) => (
                                        <option key={index}>{state}</option>
                                    ))}
                                </select>
                                <input type='text' className='bigtextboxes-thrice' placeholder='Zip code*' onChange={(event) => handleInputChange(setPostalcode, event)}></input>
                            </div>
                            <div>
                                <input type='text' className='bigtextboxes' placeholder='phone*' onChange={(event) => handleInputChange(setPhonenumber, event)}></input>
                            </div>
                            <div className='bill-headings'>
                                Additional Information
                            </div>
                            <div>
                                <textarea placeholder='Notes about your order, e.g. special notes for delivery' className='bigtextboxes bigtextboxesarea' onChange={(event) => handleInputChange(setGreetmsg, event)}></textarea>
                            </div>
                        </div>
                        <div className="col-5">
                            <div className='bill-headings'>Your order</div>
                            <div className='cartorders'>
                                <div className='row'>
                                    <div className='col-9 mergins-text'>Product</div>
                                    <div className='col-3 mergins-text'>Subtotal</div>
                                </div>
                                {cart.map((item, index) => (
                                    <div className='row' key={index}>
                                        <div className='col-9'>
                                            <img src={`./${item.image}`} className="img-checkout" alt='image supposed to be here' />
                                            <span className='smallSpan'> &#x2715; {item.quantity}</span>
                                        </div>
                                        <div className='col-3'>
                                            <i className="fa-solid fa-indian-rupee-sign"></i>{item.quantity * item.price}
                                        </div>
                                    </div>
                                ))}
                                <div className='row'>
                                    <div className='col-9 mergins-text'>Subtotal</div>
                                    <div className='col-3 mergins-text'><i className="fa-solid fa-indian-rupee-sign"></i> {subtotal}</div>
                                </div>
                                <div className='row'>
                                    <div className='col-9 mergins-text'>Total</div>
                                    <div className='col-3 mergins-text'><i className="fa-solid fa-indian-rupee-sign"></i> {subtotal}</div>
                                </div>
                            </div>
                            <div>
                                <button className='placeorderbutton' onClick={handlePayment}><i className="fa-solid fa-lock" ></i> PLACE ORDER <i className="fa-solid fa-indian-rupee-sign"></i> {subtotal}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
